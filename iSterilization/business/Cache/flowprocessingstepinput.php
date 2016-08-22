<?php

namespace iSterilization\Cache;

use iSterilization\Model\flowprocessingstepinput as Model;

class flowprocessingstepinput extends \Smart\Data\Cache {

    public function selectElement(array $data) {
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $flowprocessingid = $data['flowprocessingid'];

        $proxy = $this->getStore()->getProxy();

        $sql = "
            declare
                @flowprocessingid int = :flowprocessingid;
            
            select
                fps.id,
                fps.areasid,
                fps.elementname,
                fps.equipmentid,
                fps.elementtype
            from
                flowprocessingstep fps
            where fps.flowprocessingid = @flowprocessingid
              and ( fps.areasid is not null or fps.equipmentid is not null )
              and fps.elementtype in ('basic.SubArea','basic.Equipment')
              and fps.elementname like :name
            order by 1";

        try {
            $pdo = $proxy->prepare($sql);

            $query = "%{$query}%";

            $pdo->bindValue(":flowprocessingid", $flowprocessingid, \PDO::PARAM_INT);
            $pdo->bindValue(":name", $query, \PDO::PARAM_STR);

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

    public function selectTree(array $data) {
        $flowprocessingid = $data["flowprocessingid"];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            declare
                @flowprocessingid int = :flowprocessingid;
	
            select distinct
                fps.id, 
                null as parentid,
                fps.elementname as text,
                null as flowprocessingstepid,
                null as inputpresentationid,
                null as presentation, 
                null as presentationdescription,
                null as quantity, 
                null as datevalidity, 
                null as lotpart,
                0 as leaf
            from
                flowprocessingstepinput fpsi
                inner join flowprocessingstep fps on ( fps.id = fpsi.flowprocessingstepid )
            where fps.flowprocessingid = @flowprocessingid
            
            union all
            
            select
                fpsi.id as Id, 
                fps.id as parentid,
                ib.name as text,
                fpsi.flowprocessingstepid,
                fpsi.inputpresentationid,
                fpsi.presentation, 
                dbo.getEnum('presentation',fpsi.presentation) as presentationdescription,
                fpsi.quantity, 
                fpsi.datevalidity, 
                fpsi.lotpart,
                1 as leaf
            from
                flowprocessingstepinput fpsi
                inner join flowprocessingstep fps on ( fps.id = fpsi.flowprocessingstepid )
                inner join inputpresentation ip on ( ip.id = fpsi.inputpresentationid )
                inner join input i on ( i.id = ip.inputid )
                inner join itembase ib on ( ib.id = i.id )
            where fps.flowprocessingid = @flowprocessingid

            --order by 2, 1";

        try {

            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":flowprocessingid", $flowprocessingid, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            $root = self::buildNode($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            return self::getResultToJson();
        }

        return self::objectToJson($root);
    }

}