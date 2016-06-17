<?php

namespace iAdmin\Cache;

use iAdmin\Model\material as Model;

class material extends \Smart\Data\Cache {

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
            $p[] = "$value LIKE :$value";
        }

        $sql = "SELECT " .implode(',', $f). " FROM itembase WHERE itembasetype = 'M' and ( " . implode(' OR ', $p) . " )";

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
                i.name,
                i.description,
                i.barcode,
                coalesce(i.layoutfields,'{}') as layoutfields,
                coalesce(i.layoutvalues,'{}') as layoutvalues,
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