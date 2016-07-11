<?php

namespace iAdmin\Cache;

use iAdmin\Model\inputstock as Model;

class inputstock extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            SELECT
                it.id,
                it.inputid,
                it.datevalidity,
                it.presentation,
                dbo.getEnum('presentation',it.presentation) as presentationdescription,
                it.lotpart,
                it.lotamount
            FROM
                inputstock it
            WHERE it.inputid = :id";

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