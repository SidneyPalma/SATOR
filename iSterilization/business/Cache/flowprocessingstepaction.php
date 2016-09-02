<?php

namespace iSterilization\Cache;

use iSterilization\Model\flowprocessingstepaction as Model;

class flowprocessingstepaction extends \Smart\Data\Cache {

    public function actionTask(array $data) {
        $proxy = $this->getStore()->getProxy();

        $sql = "
			select
				count(*) as rows
			from
				flowprocessingstepaction
			where flowstepaction = '002' and isactive = 1";

        try {
            $rows = $proxy->query($sql)->fetchAll();

            $list = [];
            
            if(intval($rows[0]['rows']) != 0 ) {
                $list[0]['taskrows'] = str_pad($rows[0]['rows'], 2, '0', STR_PAD_LEFT);
                $list[0]['taskcode'] = '001';
                $list[0]['taskname'] = 'Autorizar Processos';
            }

//            $list[1]['taskrows'] = '';
//            $list[1]['taskcode'] = '002';
//            $list[1]['taskname'] = 'Mensagens de Leitura';
//
//            $list[2]['taskrows'] = '';
//            $list[2]['taskcode'] = '003';
//            $list[2]['taskname'] = 'Registrar Ciclo';
//
//            $list[3]['taskrows'] = '';
//            $list[3]['taskcode'] = '004';
//            $list[3]['taskname'] = 'Finalizar Ciclo';

            self::_setRows($list);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

	public function actionStep(array $data) {
		$proxy = $this->getStore()->getProxy();
		
		$sql = "
			select
				fpsa.id,
				fpsa.flowprocessingstepid,
				fpsa.flowstepaction,
				fpsa.isactive,
				fpsa.dateof,
				c.name as clientname,
				fps.elementname,
				fpsa.authorizedby,
				substring(convert(varchar(16), fp.dateof, 121),9,8) as timeof,
				fp.barcode,
				o.originplace
			from
				flowprocessingstepaction fpsa
				inner join flowprocessingstep fps on ( fps.id = fpsa.flowprocessingstepid )
				inner join flowprocessing fp on ( fp.id = fps.flowprocessingid )
				inner join client c on ( c.id = fp.clientid )
				outer apply (
					select
						a.elementname as originplace
					from
						flowprocessingstep a
					where a.flowprocessingid = fps.flowprocessingid
						and a.id = fps.source
				) o
			where fpsa.flowstepaction = '002'
				and fpsa.isactive = 1";

		try {
            $rows = $proxy->query($sql)->fetchAll();

			self::_setRows($rows);

		} catch ( \PDOException $e ) {
			self::_setSuccess(false);
			self::_setText($e->getMessage());
		}

		return self::getResultToJson();

	}

    public function selectCode(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                fps.username,
                fps.elementname,
                fpsa.flowstepaction,
                fpsa.flowprocessingstepid,
                dbo.getEnum('flowstepaction',fpsa.flowstepaction) as flowstepactiondescription
            from 
                flowprocessingstepaction fpsa
                inner join flowprocessingstep fps on ( fps.id = fpsa.flowprocessingstepid )
            where fpsa.flowprocessingstepid = :flowprocessingstepid";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":flowprocessingstepid", $query, \PDO::PARAM_INT);
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

    public function selectArea(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            declare
                @areasid int = :areasid;

            select
                fpsa.id,
                fp.dateof,
                fp.barcode,
                fps.username,
                fps.typechoice,
                fps.stepchoice,
                fp.patientname,
                fps.elementname,
                coalesce(s.flowstepaction,fpsa.flowstepaction) as flowstepaction,
                fps.flowprocessingid,
                c.name as clientname,
                fpsa.flowprocessingstepid,
                substring(convert(varchar(16), fp.dateof, 121),9,8) as timeof,
                dbo.getEnum('flowstepaction',fpsa.flowstepaction) as flowstepactiondescription,
				o.originplace
            from 
                flowprocessingstepaction fpsa
                inner join flowprocessingstep fps on ( fps.id = fpsa.flowprocessingstepid and fps.areasid = @areasid )
                inner join flowprocessing fp on ( fp.id = fps.flowprocessingid )
                inner join client c on ( c.id = fp.clientid )
				outer apply (
					select
						a.elementname as originplace
					from
						flowprocessingstep a
					where a.flowprocessingid = fps.flowprocessingid
					  and a.id = fps.source
				) o
				outer apply (
					select
						a.flowstepaction
					from
						flowprocessingstepaction a
					where a.flowprocessingstepid = fps.id
					  and a.flowstepaction = '002'
					  and a.isactive = 1
				) s
            where fpsa.isactive = 1
			  and fpsa.flowstepaction = '001'
            order by fp.dateof desc";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":areasid", $query, \PDO::PARAM_INT);
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

    public function selectStep(array $data) {
        $query = $data['query'];
		$proxy = $this->getStore()->getProxy();
		
        $sql = "
            select
                fps.id,
                fps.username,
                fps.datestart,
                fps.elementname,
                fps.elementtype,
                fps.stepflaglist,
                fps.stepsettings,
                fps.steppriority,
                a.name as areasname,
                c.name as clientname,
                ib.name as equipmentname,
                st.name as sterilizationtypename,
                dbo.getEnum('prioritylevel',fp.prioritylevel) as priorityleveldescription,
                fps.flowstepstatus
            from
                flowprocessingstepaction fpsa
                inner join flowprocessingstep fps on ( fps.id = fpsa.flowprocessingstepid )
                inner join flowprocessing fp on ( fp.id = fps.flowprocessingid )
                left join areas a on ( a.id = fps.areasid )
                left join itembase ib on ( ib.id = fps.equipmentid )
                inner join sterilizationtype st on ( st.id = fp.sterilizationtypeid )
                inner join client c on ( c.id = fp.clientid )
            where fpsa.id = :actionid";

        try {
			$pdo = $proxy->prepare($sql);
            $pdo->bindValue(":actionid", $query, \PDO::PARAM_INT);
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