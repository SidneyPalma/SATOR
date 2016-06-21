<?php

namespace iAdmin\Cache;

use iAdmin\Model\enumtype as Model;

class enumtype extends \Smart\Data\Cache {

    public function selectCode_(array $data) {
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

        switch ($filter) {
            case 'stAll':
                $filter = 2;
                break;
            case 'stIsActive':
                $filter = 0;
                break;
            case 'stNoActive':
                $filter = 1;
                break;
            default:
                $filter = 2;
        }

        $sql = "
            select
                etl.code as $type,
                etl.description as $description
            from
                enumtype et
                inner join enumtypelist etl on ( etl.enumtypeid = et.id )
            where et.name = :name
              and etl.isactive != :filter
              and etl.description LIKE :description
            order by etl.orderby, etl.description";

        try {
            $pdo = $proxy->prepare($sql);

            $query = "%$query%";

            $pdo->bindValue(":name", $type, \PDO::PARAM_STR);
            $pdo->bindValue(":filter", $filter, \PDO::PARAM_INT);
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