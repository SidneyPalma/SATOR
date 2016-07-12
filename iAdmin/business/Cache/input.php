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
            SELECT top 100
                ib.name,
                ib.description,
                ib.barcode,
                ib.itembasetype,
                ib.proprietaryid,
                ib.manufacturerid,
                ib.dateacquisition,
                ib.patrimonialcode,
                ib.registrationanvisa,
                ib.isactive, 
                dbo.binary2base64(ib.filedata) as filedata,
                ib.fileinfo,
                dbo.getEnum('presentation',i.presentation) as presentationdescription,
                i.*,
                p.name as providername,
                pt.name as proprietaryname,
                mf.name as manufacturername
            FROM
                itembase ib
                inner join input i on ( i.id = ib.id )
                inner join provider p on ( p.id = i.providerid )
                inner join proprietary pt on ( pt.id = ib.proprietaryid )
                inner join manufacturer mf on ( mf.id = ib.manufacturerid )
            WHERE ib.name LIKE :name OR ib.description LIKE :description";

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
                ib.name,
                ib.description,
                ib.barcode,
                ib.itembasetype,
                ib.proprietaryid,
                ib.manufacturerid,
                ib.dateacquisition,
                ib.patrimonialcode,
                ib.registrationanvisa,
                ib.isactive, 
                dbo.binary2base64(ib.filedata) as filedata,
                ib.fileinfo,
                dbo.getEnum('presentation',i.presentation) as presentationdescription,
                i.*,
                p.name as providername,
                pt.name as proprietaryname,
                mf.name as manufacturername
            FROM
                itembase ib
                inner join input i on ( i.id = ib.id )
                inner join provider p on ( p.id = i.providerid )
                inner join proprietary pt on ( pt.id = ib.proprietaryid )
                inner join manufacturer mf on ( mf.id = ib.manufacturerid )
            WHERE ib.id = :id";


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