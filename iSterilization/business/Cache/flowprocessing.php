<?php

namespace iSterilization\Cache;

use Smart\Data\Black;
use Smart\Common\Traits as Traits;
use iSterilization\Model\flowprocessing as Model;

class flowprocessing extends \Smart\Data\Cache {
    use Traits\TuserHandler;

    public function selectOpenMaterial(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select TOP 5
                ib.id,
                ib.name,
                ib.barcode,
                ib.description,
                b.materialboxid,
                dbo.binary2base64(ib.filedata) as filedata,
                ib.fileinfo,
                st.version,
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
            where ib.isactive = 1
              and (
                    ib.barcode = :barcode OR
                    ib.name COLLATE Latin1_General_CI_AI LIKE :name
              )";

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
		$black = new Black();
		
		return $black->getPatient($data);
	}

    public function selectOpenInput(array $data) {
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $equipmentid = $data['equipmentid'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            SELECT
                ip.id,
                ib.name,
                ip.acronym,
				ip.presentation,
                dbo.getEnum('presentation',ip.presentation) as presentationdescription,
				cas.lotamount,
				cas.datevalidity,
				cas.lotpart,
				cas.lotamount,
				i.hasbatch,
				i.hasstock
            FROM
                itembase ib
                inner join input i on ( i.id = ib.id )
                inner join inputpresentation ip on ( ip.inputid = i.id )
				inner join cmeareasstock cas on ( 
							cas.equipmentid = :equipmentid
						and cas.inputid = ip.inputid
						and cas.presentation = ip.presentation
						)
            WHERE ib.name LIKE :name";

        try {
            $pdo = $proxy->prepare($sql);

            $query = "%{$query}%";

            $pdo->bindValue(":name", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":equipmentid", $equipmentid, \PDO::PARAM_INT);

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

    public function selectEquipment(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            declare
                @areasid int = :areasid;
            
            select distinct
                ib.id,
                ib.name as equipmentname
            from
                equipment e
                inner join itembase ib on ( ib.id = e.id )
                inner join equipmentcycle ec on ( ec.equipmentid = ib.id )
                inner join cmesubareas csa on ( csa.cmeareasid = e.cmeareasid )
                inner join cmeareas ca on ( ca.id = csa.cmeareasid )
            where csa.id = @areasid
              and ec.id not in ( 
                    select
                        fpc.equipmentcycleid
                    from
                        flowprocessingcharge fpc
                    where fpc.equipmentcycleid = ec.id
                      and fpc.chargeflag = '001'
               )";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":areasid", $query, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectDashFlow(array $data) {
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
                fp.flowstatus,
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

    public function selectDashStep(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                --fp.id, 
                --fp.sterilizationtypeid, 
                st.name as sterilizationtypename,
                --fp.areasid, 
                --a.name as areasname,
                --fp.materialid, 
                --fp.clientid, 
                --fp.username, 
                fp.prioritylevel, 
                --fp.dateof, 
                --fp.materialboxid,
                mb.name as materialboxname,
                --fp.dateto, 
                --fp.placeid, 
                --fp.flowingid, 
                --fp.instrumentatorid, 
                fp.surgicalwarning, 
                fp.patientname, 
                fp.healthinsurance
            from
                flowprocessing fp
                inner join areas a on ( a.id = fp.areasid )
                left join materialbox mb on ( mb.id = fp.materialboxid )
                inner join sterilizationtype st on ( st.id = fp.sterilizationtypeid )
            where fp.id = :id";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":id", $query, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectCycle(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            declare
                @equipmentid int = :equipmentid;
            
            select
                c.id, 
                c.name, 
                c.duration, 
                c.temperature, 
                c.timetoopen
            from
                equipmentcycle ec
                inner join cycle c on ( c.id = ec.cycleid )
            where ec.equipmentid = @equipmentid";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":equipmentid", $query, \PDO::PARAM_INT);
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