<?php

namespace iAdmin\Cache;

use iAdmin\Model\cmeareasstock as Model;

class cmeareasstock extends \Smart\Data\Cache {

    public function selectLike(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            SELECT
                it.id,
                it.inputid,
                ib.name as inputname, 
                it.cmeareasid,
                a.name as cmeareasname, 
                it.datevalidity,
                it.presentation,
                dbo.getEnum('presentation',it.presentation) as presentationdescription,
                it.lotpart,
                it.lotamount
            FROM
                cmeareasstock it
                inner join areas a on ( a.id = it.cmeareasid )
                inner join itembase ib on ( ib.id = it.inputid )
            WHERE ib.name LIKE :inputname OR a.name LIKE :cmeareasname";

        try {
            $pdo = $proxy->prepare($sql);

            $query = "%{$query}%";

            $pdo->bindValue(":inputname", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":cmeareasname", $query, \PDO::PARAM_STR);

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