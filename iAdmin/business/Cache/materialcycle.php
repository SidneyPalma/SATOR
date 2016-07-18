<?php

namespace iAdmin\Cache;

use iAdmin\Model\materialcycle as Model;

class materialcycle extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            SELECT
                mc.id,
                :materialid as materialid,
                c.id as cycleid,
                c.name as cyclename,
                c.duration,
                c.temperature,
                case coalesce(mc.id,0) when 0 then 0 else 1 end as isactive
            FROM
                cycle c
                left join materialcycle mc on ( mc.cycleid = c.id and mc.materialid = :id )";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":id", $query, \PDO::PARAM_INT);
            $pdo->bindValue(":materialid", $query, \PDO::PARAM_INT);

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