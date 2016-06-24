<?php

namespace iAdmin\Cache;

use iAdmin\Model\cmesubareasdeposit as Model;

class cmesubareasdeposit extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            SELECT
                sad.id,
                :cmesubareasid as cmesubareasid,
                sad.name,
                sad.barcode,
                sad.isactive
            FROM
                cmesubareasdeposit sad
            WHERE sad.cmesubareasid = :id";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":id", $query, \PDO::PARAM_INT);
            $pdo->bindValue(":cmesubareasid", $query, \PDO::PARAM_INT);

            $pdo->execute();
            $rows = $pdo->fetchAll();

            for ($x = 0; $x <= 2; $x++) {
                $rows[$x]['cmesubareasid'] = $query;
            }

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

}