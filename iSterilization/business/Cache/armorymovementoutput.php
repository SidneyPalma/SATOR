<?php

namespace iSterilization\Cache;

use iSterilization\Model\armorymovementoutput as Model;

class armorymovementoutput extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $query = $data['query'];

        $proxy = $this->getStore()->getProxy();

        $sql = "
            declare
                @id int = :id;
            
            select
                am.areasid, 
                am.movementuser, 
                am.movementdate, 
                am.movementtype, 
                am.releasestype,
                am.closeddate,
                am.closedby,
                amo.*,
                c.name as clientname,
                dbo.getEnum('movementtype',am.movementtype) as movementtypedescription,
                dbo.getEnum('releasestype',am.releasestype) as releasestypedescription
            from
                armorymovement am
                inner join armorymovementoutput amo on ( amo.id = am.id )
                inner join client c on ( c.id = amo.clientid )
            where amo.id = @id";

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

}