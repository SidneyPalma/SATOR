<?php

namespace iAdmin\Cache;

use iAdmin\Model\moviment as Model;

class moviment extends \Smart\Data\Cache {

    public function selectLike(array $data) {
        $p = $f = array();
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $params = json_decode($data['params']);
        $proxy = $this->getStore()->getProxy();

        // set params
        foreach ($params as $key => $value) {
            $p[] = "$value LIKE :$value";
        }

        $sql = "
            SELECT
                m.*,
                a.name as cmeareasname
            FROM
                moviment m
                left join cmeareas ca on ( ca.id = m.cmeareasid )
                left join areas a on ( a.id = ca.id )
            WHERE ( " . implode(' OR ', $p) . " )";

        try {
            $pdo = $proxy->prepare($sql);

            $query = "%{$query}%";

            foreach ($params as $key => $value) {
                $pdo->bindValue(":$value", $query, \PDO::PARAM_STR);
            }

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