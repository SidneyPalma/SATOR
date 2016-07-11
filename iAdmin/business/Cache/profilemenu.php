<?php

namespace iAdmin\Cache;

use iAdmin\Model\profilemenu as Model;

class profilemenu extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $menuid = $data["menuid"];
        $profileid = $data["profileid"];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                pm.id,
                :profileid as profileid,
                m.id as menuid,
                m.name
            from
                menu m
                left join profilemenu pm on ( pm.menuid = m.id and pm.profileid = :id )
            where m.id = :menuid";

        try {

            $pdo = $proxy->prepare($sql);
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

    public function selectTree(array $data) {
        $module = $data["module"];
        $profileid = $data["profileid"];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                mm.id,
                coalesce(mn.glyph,mm.glyph) as glyph,
                mn.router,
                mm.parentid,
                coalesce(mn.name,mm.name) as text,
                :id as profileid,
                pm.id as profilemenuid,
                mn.id as menuid,
                case coalesce(len(mn.router),0) when 0 then 0 else 1 end as leaf
            from
                modulemenu mm
                inner join module md on ( md.id = mm.moduleid )
                left join menu mn on ( mn.id = mm.menuid )
                left join profilemenu pm on ( pm.menuid = mn.id and pm.profileid = :profileid )
            where md.name = :module
            order by mm.id, mm.parentid;";

        try {

            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":id", $profileid, \PDO::PARAM_INT);
            $pdo->bindValue(":module", $module, \PDO::PARAM_STR);
            $pdo->bindValue(":profileid", $profileid, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            $rows = $this->getActions($data, $rows);

            $root = self::buildNode($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            return self::getResultToJson();
        }

        return self::objectToJson($root);
    }

    public function getActions (array $data, $rows) {
        $profileid = $data["profileid"];

        $sql = "
            select
                pm.menuid,
                a.directive
            from
                profilemenu pm
                inner join menuaction ma on ( ma.menuid = pm.menuid )
                inner join action a on ( a.id = ma.actionid )
                inner join menu m on ( m.id = ma.menuid )
                inner join profilemenuaction pma on ( pma.menuactionid = ma.id and pma.profilemenuid = pm.id )
            where pm.profileid = :profileid
            order by pm.menuid, a.directive";

        $pdo = $this->getStore()->getProxy()->prepare($sql);
        $pdo->bindValue(":profileid", $profileid, \PDO::PARAM_INT);
        $pdo->execute();
        $directive = $pdo->fetchAll();

        $i = 0;
        foreach ($rows as $record) {

            if($record['leaf'] == 1) {
                $list = self::searchArray($directive,'menuid',$record['menuid']);
                if(count($list) != 0) {
                    $list = self::selectArray($list,'directive');
                    $rows[$i]['description'] = trim(implode(', ', $list));
                }
            }

            $i++;

        }

        return $rows;

    }

}