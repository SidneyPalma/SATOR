<?php

namespace iAdmin\Cache;

use iAdmin\Model\usersprofile as Model;

class usersprofile extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $usersid = $data["usersid"];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select distinct
                up.id,
                p.name,
                :usersid as usersid,
                p.id as profileid,
                up.expireto
            from
                profile p
                inner join profilemenu pm on ( pm.profileid = p.id )
                left join usersprofile up on ( up.profileid = p.id and up.usersid = :id )";

        try {

            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":id", $usersid, \PDO::PARAM_INT);
            $pdo->bindValue(":usersid", $usersid, \PDO::PARAM_INT);
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