<?php

namespace iAdmin\Cache;

use iAdmin\Model\cmeareasdeposit as Model;

class cmeareasdeposit extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            SELECT
                sad.id,
                :cmeareasid as cmeareasid,
                sad.name,
                sad.barcode,
                sad.isactive
            FROM
                cmeareasdeposit sad
            WHERE sad.cmeareasid = :id";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":id", $query, \PDO::PARAM_INT);
            $pdo->bindValue(":cmeareasid", $query, \PDO::PARAM_INT);

            $pdo->execute();
            $rows = $pdo->fetchAll();

            for ($x = 0; $x <= 2; $x++) {
                $rows[$x]['cmeareasid'] = $query;
            }

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

}