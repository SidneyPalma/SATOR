<?php

namespace iAdmin\Cache;

use iAdmin\Model\profilemenuaction as Model;

class profilemenuaction extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $menuid = $data["menuid"];
        $profileid = $data["profileid"];

        $sql = "
            select
                pma.id,
                :id as profileid,
                m.id as menuid,
                a.directive,
                a.description,
                pm.id as profilemenuid,
                ma.id as menuactionid,
                pma.expireto
            from
                menuaction ma
                inner join action a on ( a.id = ma.actionid )
                inner join menu m on ( m.id = ma.menuid )
                left join profilemenu pm on ( pm.menuid = m.id and pm.profileid = :profileid )
                left join profilemenuaction pma on ( pma.menuactionid = ma.id and pma.profilemenuid = pm.id )
            where m.id = :menuid
            order by a.directive";

        try {

            $pdo = $this->getStore()->getProxy()->prepare($sql);
            $pdo->bindValue(":id", $profileid, \PDO::PARAM_INT);
            $pdo->bindValue(":menuid", $menuid, \PDO::PARAM_INT);
            $pdo->bindValue(":profileid", $profileid, \PDO::PARAM_INT);
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