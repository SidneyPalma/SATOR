<?php

namespace iAdmin\Cache;

use iAdmin\Model\modulemenu as Model;

class modulemenu extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $query = $data["query"];
        $proxy = $this->getStore()->getProxy();

        $sql = "
			declare
				@query int = :query;
				
            select
                mm.id,
                mm.parentid,
                name = coalesce(mm.name,( select name from modulemenu where id = mm.parentid )),
                mm.glyph,
                mm.moduleid,
                mm.menuid,
                m.name as menuname,
                mm.orderby
            from
                modulemenu mm
                left join menu m on ( m.id = mm.menuid )
            where mm.id = @query";

        try {

            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":query", $query, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectName(array $data) {
        $query = $data["query"];
        $moduleid = $data["moduleid"];
        $proxy = $this->getStore()->getProxy();

        $sql = "
			declare
				@moduleid int = :moduleid,
				@query varchar(60) = :query;
				
            select
                mm.id,
                mm.name
            from
                modulemenu mm
            where mm.menuid is null
              and mm.name like @query
              and mm.moduleid = @moduleid
            order by mm.orderby";

        try {

            $query = '%' . $query . '%';
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":query", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":moduleid", $moduleid, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectLike(array $data) {
        $query = $data["query"];
        $moduleid = $data["moduleid"];
        $proxy = $this->getStore()->getProxy();

        $sql = "
			declare
				@moduleid int = :moduleid,
				@query varchar(60) = :query,
				@available varchar(60) = :available;
						
            select
                m.id,
                m.name,
                m.description
            from
                menu m
            where m.available like @available
              and m.name like @query
              and m.id not in ( select mm.menuid from modulemenu mm where mm.moduleid = @moduleid and mm.menuid is not null )";

        try {

            $query = '%' . $query . '%';
            $available = '%,' . $moduleid . ',%';

            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":query", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":moduleid", $moduleid, \PDO::PARAM_INT);
            $pdo->bindValue(":available", $available, \PDO::PARAM_STR);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectMenu(array $data) {
        $module = isset($data["module"]) == true ? $data["module"] : '';

        if(strlen($module) == 0) {
            return self::getResultToJson();
        }

        $sql = "
			declare
				@module varchar(60) = :module;
		
            select
                mm.id,
                mn.router,
                mm.menuid,
                m.id as moduleid,
                mm.parentid,
                name = coalesce(mm.name,( select name from modulemenu where id = mm.parentid )),
                mn.name as menuname,
                mm.orderby,
                mn.menutype,
                coalesce(mn.name,mm.name) as text,
                coalesce(mn.glyph,mm.glyph) as glyph,
                case coalesce(len(mn.router),0) when 0 then 0 else 1 end as leaf
            from
                module m
                inner join modulemenu mm on ( mm.moduleid = m.id )
                left join  menu mn on ( mn.id = mm.menuid )
            where m.name = @module
            order by mm.orderby";

        try {
            $pdo = $this->getStore()->getProxy()->prepare($sql);
            $pdo->bindValue(":module", $module, \PDO::PARAM_STR);

            $pdo->execute();
            $rows = $pdo->fetchAll();

            $root = self::buildNode($rows);
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            return self::getResultToJson();
        }

        return self::objectToJson($root);
    }

    public function selectTree(array $data) {
        $module = isset($data["module"]) == true ? $data["module"] : '';

        if(strlen($module) == 0) {
            return self::getResultToJson();
        }

        $sql = "
			declare
				@module varchar(60) = :module;
				
            select
                mm.id,
                mn.router,
                mm.menuid,
                m.id as moduleid,
                mm.parentid,
                name = coalesce(mm.name,( select name from modulemenu where id = mm.parentid )),
                mn.name as menuname,
                mm.orderby,
                coalesce(mn.name,mm.name) as text,
                coalesce(mn.glyph,mm.glyph) as glyph,
                coalesce(mn.menutype,'tpTree') as menutype,
                case coalesce(len(mn.router),0) when 0 then 0 else 1 end as leaf
            from
                module m
                inner join modulemenu mm on ( mm.moduleid = m.id )
                left join  menu mn on ( mn.id = mm.menuid )
            where m.name = @module
            order by mm.orderby";

        try {
            $pdo = $this->getStore()->getProxy()->prepare($sql);
            $pdo->bindValue(":module", $module, \PDO::PARAM_STR);

            $pdo->execute();
            $rows = $pdo->fetchAll();

            $rows = self::searchArray($rows,'menutype','tpTree');

            $root = self::buildNode($rows);
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            return self::getResultToJson();
        }

        return self::objectToJson($root);
    }

    public function selectDock(array $data) {
        $query = $data["query"];
        $module = $data["module"];

        $query = "%{$query}%";

        $sql = "
			declare
				@query varchar(60) = :query,
				@module varchar(60) = :module;
				
            select
                mm.id,
                mn.router,
                mn.name,
                mn.description,
                mn.glyph
            from
                module m
                inner join modulemenu mm on ( mm.moduleid = m.id )
                inner join  menu mn on ( mn.id = mm.menuid )
            where m.name = @module
              and mn.name like @query
              and mn.menutype = 'tpDock'
            order by mm.orderby";

        try {
            $pdo = $this->getStore()->getProxy()->prepare($sql);
            $pdo->bindValue(":query", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":module", $module, \PDO::PARAM_STR);

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