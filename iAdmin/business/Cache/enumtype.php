<?php

namespace iAdmin\Cache;

use iAdmin\Model\enumtype as Model;

class enumtype extends \Smart\Data\Cache {

    public function selectLike(array $data) {
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            declare
                @name varchar(60) = :name,
                @description varchar(60) = :description;

            SELECT
                et.*
            FROM
                enumtype et
            WHERE et.name = @name
               OR et.description COLLATE Latin1_General_CI_AI LIKE @description";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":name", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":description", "%$query%", \PDO::PARAM_STR);

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

    public function selectItem(array $data) {
        $type = $data['type'];
        $query = $data['query'];
        $description = $type . 'description';
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                etl.code as $type,
                etl.description as $description
            from
                enumtype et
                inner join enumtypelist etl on ( etl.enumtypeid = et.id )
            where et.name = :name
              and etl.code = :code";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":name", $type, \PDO::PARAM_STR);
            $pdo->bindValue(":code", $query, \PDO::PARAM_STR);

            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectEnum(array $data) {
        $type = $data['type'];
        $query = $data['query'];
        $filter = $data['filter'];
        $description = $type . 'description';
        $proxy = $this->getStore()->getProxy();

        $filter = strlen($filter) != 0 ? "and etl.filtertype like '%{$filter}%'" : "";

        $sql = "
            select
                etl.code as $type,
                etl.description as $description
            from
                enumtype et
                inner join enumtypelist etl on ( etl.enumtypeid = et.id )
            where et.name = :name
              $filter
              and etl.isactive = 1
              and etl.description like :description
            order by etl.orderby, etl.description";

        try {
            $pdo = $proxy->prepare($sql);

            $query = "%$query%";

            $pdo->bindValue(":name", $type, \PDO::PARAM_STR);
            $pdo->bindValue(":description", $query, \PDO::PARAM_STR);

            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectMobileDigit(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "select coalesce(bdo.getEnum('mobiledigit', :query),'9999-9999') as mobiledigit";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":query", $query, \PDO::PARAM_STR);

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