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
                i.id, 
                i.name, 
                i.description, 
                i.barcode, 
                i.presentation, 
                dbo.getEnum('presentation',i.presentation) as presentationdescription,
                i.manufacturerid, 
                i.providerid, 
                i.codeanvisa, 
                i.controlstock, 
                i.isactive, 
                i.mandatorytesting, 
                i.minstock, 
                i.maxstock, 
                i.resetpoint, 
                i.deadline, 
                i.validityactivation, 
                dbo.binary2base64(i.filedata) as filedata,
                i.fileinfo,
                m.name as manufacturername,
                p.name as providername
            FROM
                input i
                inner join provider p on ( p.id = i.providerid )
                inner join manufacturer m on ( m.id = i.manufacturerid )
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
                i.id, 
                i.name, 
                i.description, 
                i.barcode, 
                i.presentation, 
                dbo.getEnum('presentation',i.presentation) as presentationdescription,
                i.manufacturerid, 
                i.providerid, 
                i.codeanvisa, 
                i.controlstock, 
                i.isactive, 
                i.mandatorytesting, 
                i.minstock, 
                i.maxstock, 
                i.resetpoint, 
                i.deadline, 
                i.validityactivation, 
                dbo.binary2base64(i.filedata) as filedata,
                i.fileinfo,
                m.name as manufacturername,
                p.name as providername
            FROM
                input i
                inner join provider p on ( p.id = i.providerid )
                inner join manufacturer m on ( m.id = i.manufacturerid )
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