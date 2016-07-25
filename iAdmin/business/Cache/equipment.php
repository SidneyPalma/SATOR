<?php

namespace iAdmin\Cache;

use iAdmin\Model\equipment as Model;

class equipment extends \Smart\Data\Cache {

    public function selectArea(array $data) {
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $cmeareasid = $data['cmeareasid'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            SELECT
                ib.id,
                ib.id as equipmentid,
                ib.name as equipmentname
            FROM
                itembase ib
                inner join equipment e on ( e.id = ib.id )
            WHERE ib.itembasetype = 'E'
              and e.cmeareasid = :cmeareasid
              and ib.name COLLATE Latin1_General_CI_AI LIKE :name";

        try {
            $pdo = $proxy->prepare($sql);

            $query = "%{$query}%";

            $pdo->bindValue(":name", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":cmeareasid", $cmeareasid, \PDO::PARAM_INT);

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

    public function selectLike(array $data) {
        $p = $f = array();
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $params = json_decode($data['params']);
        $proxy = $this->getStore()->getProxy();
        $notate = $this->getStore()->getModel()->getNotate();
        $fields = (isset($data['fields']) && count(json_decode($data['fields'])) !== 0) ? json_decode($data['fields']) : self::objectToArray($notate->property);

        // set fields
        foreach ($fields as $key => $value) {
            $f[] = $value;
        }

        // set params
        foreach ($params as $key => $value) {
            $p[] = "$value COLLATE Latin1_General_CI_AI LIKE :$value";
        }

        $sql = "SELECT " .implode(',', $f). " FROM itembase WHERE itembasetype = 'E' and ( " . implode(' OR ', $p) . " )";

        try {
            $pdo = $proxy->prepare($sql);

            $query = "%{$query}%";

            foreach ($params as $key => $value) {
                $pdo->bindValue(":$value", $query, \PDO::PARAM_STR);
            }

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
                dbo.getEnum('itemgroup',ib.itemgroup) as itemgroupdescription,
                dbo.binary2base64(ib.filedata) as filedata,
                ib.fileinfo,
                e.*,
                pt.name as proprietaryname,
                mf.name as manufacturername,
                ca.name as cmeareasname,
                es.name as equipmentstatusname
            FROM
                itembase ib
                inner join equipment e on ( e.id = ib.id )
                inner join proprietary pt on ( pt.id = ib.proprietaryid )
                inner join manufacturer mf on ( mf.id = ib.manufacturerid )
                inner join areas ca on ( ca.id = e.cmeareasid )
                inner join equipmentstatus es on ( es.id = e.equipmentstatusid )
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