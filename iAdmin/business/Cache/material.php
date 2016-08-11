<?php

namespace iAdmin\Cache;

use iAdmin\Model\material as Model;

class material extends \Smart\Data\Cache {

    public function selectLike(array $data) {
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $proxy = $this->getStore()->getProxy();
        $total = isset($data['totalresults']) ? $data['totalresults'] : 10;

        $sql = "
            SELECT top $total  
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
                ib.itemgroup,
                dbo.getEnum('itemsize',m.itemsize) as itemsizedescription,
                dbo.getEnum('itemgroup',ib.itemgroup) as itemgroupdescription,
                materialboxname = (
                  SELECT TOP 1
                    mb.name
                  FROM
                    materialbox mb
                    inner join materialboxitem mbi on ( 
                                            mbi.materialboxid = mb.id
                                        AND mbi.materialid = m.id
                                        AND mbi.boxitemstatus = 'A' )
                    inner join itembase ibt on ( ibt.id = mbi.materialid )
                ),
                m.*,
                ms.name as materialstatusname,
                pk.name as packingname,
                pt.name as proprietaryname,
                mf.name as manufacturername
            FROM
                itembase ib
                inner join material m on ( m.id = ib.id )
                inner join materialstatus ms on ( ms.id = m.materialstatusid )
                inner join packing pk on ( pk.id = m.packingid )
                inner join proprietary pt on ( pt.id = ib.proprietaryid )
                inner join manufacturer mf on ( mf.id = ib.manufacturerid )
            WHERE ib.name COLLATE Latin1_General_CI_AI LIKE :name
               OR ib.barcode COLLATE Latin1_General_CI_AI LIKE :barcode
               OR ib.description COLLATE Latin1_General_CI_AI LIKE :description";

        try {
            $pdo = $proxy->prepare($sql);

            $query = "%{$query}%";

            $pdo->bindValue(":name", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":barcode", $query, \PDO::PARAM_STR);
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
                coalesce(ib.resultfield,'{}') as resultfield,
                ib.proprietaryid,
                ib.manufacturerid,
                ib.dateacquisition,
                ib.patrimonialcode,
                ib.registrationanvisa,
                ib.isactive,
                ib.itemgroup,
                dbo.getEnum('itemsize',m.itemsize) as itemsizedescription,
                dbo.getEnum('itemgroup',ib.itemgroup) as itemgroupdescription,
                dbo.binary2base64(ib.filedata) as filedata,
                ib.fileinfo,
                materialboxname = (
                  SELECT TOP 1
                    mb.name
                  FROM
                    materialbox mb
                    inner join materialboxitem mbi on ( 
                                            mbi.materialboxid = mb.id
                                        AND mbi.materialid = m.id
                                        AND mbi.boxitemstatus = 'A' )
                    inner join itembase ibt on ( ibt.id = mbi.materialid )
                ),
                m.*,
                ms.name as materialstatusname,
                pk.name as packingname,
                pt.name as proprietaryname,
                mf.name as manufacturername
            FROM
                itembase ib
                inner join material m on ( m.id = ib.id )
                inner join materialstatus ms on ( ms.id = m.materialstatusid )
                inner join packing pk on ( pk.id = m.packingid )
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

    public function selectBox(array $data) {
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $proxy = $this->getStore()->getProxy();
        $materialboxid = isset($data['materialboxid']) ? $data['materialboxid'] : null;
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
                ib.itemgroup,
                dbo.getEnum('itemsize',m.itemsize) as itemsizedescription,
                dbo.getEnum('itemgroup',ib.itemgroup) as itemgroupdescription,
                materialboxname = (
                  SELECT TOP 1
                    mb.name
                  FROM
                    materialbox mb
                    inner join materialboxitem mbi on ( 
                                            mbi.materialboxid = mb.id
                                        AND mbi.materialid = m.id
                                        AND mbi.boxitemstatus = 'A' )
                    inner join itembase ibt on ( ibt.id = mbi.materialid )
                ),
                m.*,
                ms.name as materialstatusname,
                pk.name as packingname,
                pt.name as proprietaryname,
                mf.name as manufacturername
            FROM
                itembase ib
                inner join material m on ( m.id = ib.id )
                inner join materialstatus ms on ( ms.id = m.materialstatusid )
                inner join packing pk on ( pk.id = m.packingid )
                inner join proprietary pt on ( pt.id = ib.proprietaryid )
                inner join manufacturer mf on ( mf.id = ib.manufacturerid )
                inner join materialboxitem mbi on ( mbi.materialid = m.id and mbi.materialboxid = :materialboxid )
            WHERE ib.name COLLATE Latin1_General_CI_AI LIKE :name
               OR ib.barcode COLLATE Latin1_General_CI_AI LIKE :barcode
               OR ib.description COLLATE Latin1_General_CI_AI LIKE :description";

        try {
            $pdo = $proxy->prepare($sql);

            $query = "%{$query}%";

            $pdo->bindValue(":name", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":barcode", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":description", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":materialboxid", $materialboxid, \PDO::PARAM_INT);

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

}