<?php

namespace iAdmin\Cache;

use iAdmin\Model\input as Model;

class input extends \Smart\Data\Cache {

    public function selectLike(array $data) {
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            SELECT
                i.*,
                um.name as unitmeasurementname,
                m.name as manufacturername,
                p.name as providername
            FROM
                input i
                inner join provider p on ( p.id = i.providerid )
                inner join manufacturer m on ( m.id = i.manufacturerid )
                inner join unitmeasurement um on ( um.id = i.unitmeasurementid )
            WHERE i.name LIKE :name OR i.description LIKE :description";

        try {
            $pdo = $proxy->prepare($sql);

            $query = "%{$query}%";

            $pdo->bindValue(":name", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":description", $query, \PDO::PARAM_STR);

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

    public function selectCode(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            SELECT
                i.*,
                um.name as unitmeasurementname,
                m.name as manufacturername,
                p.name as providername
            FROM
                input i
                inner join provider p on ( p.id = i.providerid )
                inner join manufacturer m on ( m.id = i.manufacturerid )
                inner join unitmeasurement um on ( um.id = i.unitmeasurementid )
            WHERE i.id = :id";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":id", $query, \PDO::PARAM_INT);

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