<?php

namespace iSterilization\Cache;

use iSterilization\Model\flowprocessingstepaction as Model;

class flowprocessingstepaction extends \Smart\Data\Cache {

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
            select
                fpsa.id,
                fp.dateof,
                fp.barcode,
                fps.username,
                fp.patientname,
                fps.elementname,
                fpsa.flowstepaction,
                fps.flowprocessingid,
                c.name as clientname,
                fpsa.flowprocessingstepid,
                substring(convert(varchar(16), fp.dateof, 121),9,8) as timeof,
                dbo.getEnum('flowstepaction',fpsa.flowstepaction) as flowstepactiondescription,
				originplace = (
					select top 1
						a.elementname
					from
						flowprocessingstep a
					where a.flowprocessingid = fps.flowprocessingid
					  and a.steplevel = fps.steplevel-1
					  and a.stepchoice is not null
				)
            from 
                flowprocessingstepaction fpsa
                inner join flowprocessingstep fps on ( fps.id = fpsa.flowprocessingstepid and fps.areasid = :areasid )
                inner join flowprocessing fp on ( fp.id = fps.flowprocessingid )
                inner join client c on ( c.id = fp.clientid )
            where fpsa.isactive = 1
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
            $pdo = $this->prepare($sql);
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