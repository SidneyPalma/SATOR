<?php

namespace iAdmin\Cache;

use iAdmin\Model\usersmenuaction as Model;

class usersmenuaction extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $menuid = $data["menuid"];
        $usersid = $data["usersid"];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                uma.id,
                :id as usersid,
                m.id as menuid,
                a.directive,
                a.description,
                um.id as usersmenuid,
                ma.id as menuactionid,
                uma.expireto
            from
                menuaction ma
                inner join menu m on ( m.id = ma.menuid )
                inner join action a on ( a.id = ma.actionid )
                left join usersmenu um on ( um.menuid = m.id and um.usersid = :usersid )
                left join usersmenuaction uma on ( uma.menuactionid = ma.id and uma.usersmenuid = um.id )
            where m.id = :menuid
            order by a.directive";

        try {

            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":id", $usersid, \PDO::PARAM_INT);
            $pdo->bindValue(":menuid", $menuid, \PDO::PARAM_INT);
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