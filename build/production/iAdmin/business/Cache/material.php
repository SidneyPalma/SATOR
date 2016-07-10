<?php

namespace iAdmin\Cache;

use iAdmin\Model\material as Model;

class material extends \Smart\Data\Cache {

    public function selectLike(array $data) {
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            SELECT
                i.name,
                i.description,
                i.barcode,
                i.proprietaryid,
                i.manufacturerid,
                i.dateacquisition,
                i.patrimonialcode,
                i.itembasetype,
                i.registrationanvisa,
                i.isactive,
                dbo.getEnum('itemsize',m.itemsize) as itemsizedescription,
                dbo.getEnum('itemgroup',m.itemgroup) as itemgroupdescription,
                dbo.binary2base64(i.filedata) as filedata,
                i.fileinfo,
                materialboxname = (
                  SELECT TOP 1
                    mb.name
                  FROM
                    materialbox mb
                    inner join materialboxitem mbi on ( 
                                            mbi.materialboxid = mb.id
                                        AND mbi.materialid = m.id
                                        AND mbi.boxitemstatus = 'A' )
                    inner join itembase ib on ( ib.id = mbi.materialid )
                ),
                m.*,
                ms.name as materialstatusname,
                pk.name as packingname,
                pt.name as proprietaryname,
                mf.name as manufacturername
            FROM
                itembase i
                inner join material m on ( m.id = i.id )
                inner join materialstatus ms on ( ms.id = m.materialstatusid )
                inner join packing pk on ( pk.id = m.packingid )
                inner join proprietary pt on ( pt.id = i.proprietaryid )
                inner join manufacturer mf on ( mf.id = i.manufacturerid )
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
                i.name,
                i.description,
                i.barcode,
                coalesce(i.resultfield,'{}') as resultfield,
                i.proprietaryid,
                i.manufacturerid,
                i.dateacquisition,
                i.patrimonialcode,
                i.itembasetype,
                i.registrationanvisa,
                i.isactive,
                dbo.getEnum('itemsize',m.itemsize) as itemsizedescription,
                dbo.getEnum('itemgroup',m.itemgroup) as itemgroupdescription,
                dbo.binary2base64(i.filedata) as filedata,
                i.fileinfo,
                materialboxname = (
                  SELECT TOP 1
                    mb.name
                  FROM
                    materialbox mb
                    inner join materialboxitem mbi on ( 
                                            mbi.materialboxid = mb.id
                                        AND mbi.materialid = m.id
                                        AND mbi.boxitemstatus = 'A' )
                    inner join itembase ib on ( ib.id = mbi.materialid )
                ),
                m.*,
                ms.name as materialstatusname,
                pk.name as packingname,
                pt.name as proprietaryname,
                mf.name as manufacturername
            FROM
                itembase i
                inner join material m on ( m.id = i.id )
                inner join materialstatus ms on ( ms.id = m.materialstatusid )
                inner join packing pk on ( pk.id = m.packingid )
                inner join proprietary pt on ( pt.id = i.proprietaryid )
                inner join manufacturer mf on ( mf.id = i.manufacturerid )
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