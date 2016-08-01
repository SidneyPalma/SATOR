<?php

namespace iSterilization\Cache;

use Smart\Data\Black;
use Smart\Common\Traits as Traits;
use iSterilization\Model\flowprocessing as Model;

class flowprocessing extends \Smart\Data\Cache {
    use Traits\TuserHandler;

    public function selectUserCode(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                u.id,
                u.username,
                u.fullname,
                u.isactive
            from
                users u
            where u.username = :usercode";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":usercode", $query, \PDO::PARAM_STR);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);
            self::_setSuccess(count($rows) != 0);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectUserFlow(array $data) {
        $id = $data['id'];
        $username = $data['username'];
        $password = $data['password'];
        $proxy = $this->getStore()->getProxy();

        $sql = "select username, password from users where id = :id and username = :username";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":id", $id, \PDO::PARAM_INT);
            $pdo->bindValue(":username", $username, \PDO::PARAM_STR);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            $passwordUser = (count($rows) != 0) ? $rows[0]['password'] : '';
            $success = self::tryHash($password,$passwordUser);
            $rows[0]['password'] = '';

            self::_setRows($rows);
            self::_setSuccess($success);
            self::_setText($success ? 'Autenticado com sucesso!' : 'Sua tentativa fracassou, o usuário NÂO foi Autenticado!');

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectOpenMaterial(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                ib.id,
                ib.name,
                ib.barcode,
                ib.description,
                b.materialboxid,
                dbo.binary2base64(ib.filedata) as filedata,
                ib.fileinfo,
                mf.name as manufacturername,
                -- tipo de fluxo e prioridade
                mtf.sterilizationtypeid,
                st.name as sterilizationtypename,
                mtf.prioritylevel,
                dbo.getEnum('prioritylevel',mtf.prioritylevel) as priorityleveldescription,
                st.name +' ('+ dbo.getEnum('prioritylevel',mtf.prioritylevel) +')' as sterilizationpriority
            from
                itembase ib
                inner join manufacturer mf on ( mf.id = ib.manufacturerid )
                inner join material m on ( m.id = ib.id )
                inner join materialtypeflow mtf on ( mtf.materialid = m.id and mtf.prioritylevel = 'N' )
                inner join sterilizationtype st on ( st.id = mtf.sterilizationtypeid )
                outer apply (
					select top 1
						mbi.materialboxid
					from
						materialboxitem mbi
					where mbi.materialid = ib.id
				) b
            where ib.barcode = :barcode OR ib.name COLLATE Latin1_General_CI_AI LIKE :name";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":barcode", $query, \PDO::PARAM_INT);
            $pdo->bindValue(":name", "{$query}%", \PDO::PARAM_STR);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectOpenSterilizationType(array $data) {
        $materialid = $data['materialid'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                st.id,
                st.name,
                mtf.prioritylevel,
                dbo.getEnum('prioritylevel',mtf.prioritylevel) as priorityleveldescription,
                st.name +' ('+ dbo.getEnum('prioritylevel',mtf.prioritylevel) +')' as sterilizationpriority
            from
                itembase ib
                inner join material m on ( m.id = ib.id )
                inner join materialtypeflow mtf on ( mtf.materialid = m.id )
                inner join sterilizationtype st on ( st.id = mtf.sterilizationtypeid )
            where mtf.materialid = :materialid";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":materialid", $materialid, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectOpenPatient(array $data) {
        $proxy = new Black();
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];

        $sql = "
            select
                AVISO_CIRURGIA as id,
                COD_PACIENTE as id_patient,
                PACIENTE as name,
                CONVENIO as health_insurance
            from
                avisocirurgia
            where AVISO_CIRURGIA like :AVISO_CIRURGIA or PACIENTE like :PACIENTE";

        try {

            $query = "%{$query}%";

            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":PACIENTE", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":AVISO_CIRURGIA", $query, \PDO::PARAM_STR);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);
            self::_setPage($start,$limit);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function insertOpenFlowView(array $data) {
        $query = self::jsonToObject($data['query']);

        $this->getStore()->getModel()->set('areasid',$query->areasid);
        $this->getStore()->getModel()->set('clientid',$query->clientid);
        $this->getStore()->getModel()->set('username',$query->username);
        $this->getStore()->getModel()->set('materialid',$query->materialid);
        $this->getStore()->getModel()->set('prioritylevel',$query->prioritylevel);
        $this->getStore()->getModel()->set('sterilizationtypeid',$query->sterilizationtypeid);

        if(isset($query->materialboxid) && strlen($query->materialboxid) != 0) {
            $this->getStore()->getModel()->set('materialboxid',$query->materialboxid);
        }

        if($query->clienttype == '004') {
            $this->getStore()->getModel()->set('placeid',$query->placeid);
            $this->getStore()->getModel()->set('flowingid',$query->flowingid);
            $this->getStore()->getModel()->set('patientname',$query->patientname);
            $this->getStore()->getModel()->set('healthinsurance',$query->healthinsurance);
            $this->getStore()->getModel()->set('surgicalwarning',$query->surgicalwarning);
            $this->getStore()->getModel()->set('instrumentatorid',$query->instrumentatorid);
        }

        $result = self::jsonToObject($this->getStore()->insert());

        $step = array();

        $step['flowprocessingid'] = $result->rows->id;

        $this->updateStep($step);

        return self::objectToJson($result);
    }

    public function updateStep(array $step) {
        $flowprocessingid = $step['flowprocessingid'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            -- Metodo Inicia Leitura
            select
                fps.id,  
                fps.steppriority, 
                fps.steplevel, 
                fps.elementtype, 
                fps.elementname, 
                fps.stepflaglist, 
                fps.stepsettings
            from
                flowprocessingstep fps
                inner join flowprocessing fp on ( fp.id = fps.flowprocessingid )
            where fp.flowstatus = 'R'
              and fps.flowstepstatus = '000'
              and fps.elementtype not in ('uml.StartState','uml.EndState')
              and fps.flowprocessingid = :flowprocessingid 
            order by fps.steplevel, fps.steppriority";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":flowprocessingid", $flowprocessingid, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            $action = new \iSterilization\Coach\flowprocessingaction();
            $flowstep = new \iSterilization\Coach\flowprocessingstep();

            while(list(, $item) = each($rows)) {
                extract($item);

                $pos = strpos($stepflaglist, '001');

                if ($pos !== false) {
                    $action->getStore()->getModel()->set('flowprocessingstepid',$id);
                    $action->getStore()->getModel()->set('flowstepaction','001');
                    $action->getStore()->getModel()->set('isactive',1);
                    $action->getStore()->insert();

                    $this->getStore()->getModel()->set('flowstatus','I');
                    $this->getStore()->update();

                    $date = date("Y-m-d H:i");
                    $flowstep->getStore()->getModel()->set('id',$id);
                    $flowstep->getStore()->getModel()->set('datestart',$date);
                    $flowstep->getStore()->getModel()->set('flowstepstatus','001');
                    $flowstep->getStore()->update();
                    break;
                }
            }
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectFlow(array $data) {
        $dateof = $data['dateof'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                fp.id, 
                fp.sterilizationtypeid, 
                st.name as sterilizationtypename,
                fp.areasid, 
                a.name as areasname,
                fp.materialid, 
                fp.clientid, 
                fp.username, 
                fp.prioritylevel, 
                fp.dateof, 
                fp.materialboxid,
                mb.name as materialboxname,
                fp.dateto, 
                fp.placeid, 
                fp.flowingid, 
                fp.instrumentatorid, 
                fp.surgicalwarning, 
                fp.patientname, 
                fp.healthinsurance
            from
                flowprocessing fp
                inner join areas a on ( a.id = fp.areasid )
                left join materialbox mb on ( mb.id = fp.materialboxid )
                inner join sterilizationtype st on ( st.id = fp.sterilizationtypeid )
            where convert(char(10),fp.dateof,126) = :dateof";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":dateof", $dateof, \PDO::PARAM_STR);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

}