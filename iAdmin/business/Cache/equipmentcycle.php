<?php

namespace iAdmin\Cache;

use iAdmin\Model\equipmentcycle as Model;

class equipmentcycle extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            SELECT
                ec.id,
                :equipmentid as equipmentid,
                c.id as cycleid,
                c.name as cyclename,
                c.duration,
                c.temperature,
                case coalesce(ec.id,0) when 0 then 0 else 1 end as isactive
            FROM
                cycle c
                left join equipmentcycle ec on ( ec.cycleid = c.id and ec.equipmentid = :id )
            order by c.name";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":id", $query, \PDO::PARAM_INT);
            $pdo->bindValue(":equipmentid", $query, \PDO::PARAM_INT);

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

}