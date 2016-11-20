<?php

namespace iSterilization\Cache;

use iSterilization\Model\serviceregistration as Model;

class serviceregistration extends \Smart\Data\Cache {

    public function selectData(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                sr.resultvalue,
                coalesce(sr.resultfield,ib.resultfield) as resultfield
            from
                serviceregistration sr
                left join itembase ib on ( ib.id = sr.itembaseid )
            where sr.id = :id
              and coalesce(sr.resultfield,ib.resultfield) is not null";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":id", $query, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = self::encodeUTF8($pdo->fetchAll());

            if(count($rows) != 0) {
                $resultvalue = $rows[0]['resultvalue'];
                $resultfield = $rows[0]['resultfield'];

                $i = 0;
                $json = self::jsonToArray($resultvalue);
                $base = self::jsonToArray($resultfield);

                foreach ($base as $item) {
                    $list[$i]['id'] = $i+1;
                    $defaultValue = $item['defaultValue'];
                    $value = isset($json[$i]['value']) ? $json[$i]['value'] : '';

                    $defaultValue = strlen($value) != 0 ? $value : $defaultValue;

                    $list[$i]['datavalue'] = $defaultValue;
                    $list[$i]['fieldname'] = $item['name'];
                    $list[$i]['fieldtext'] = $item['displayName'];
                    $list[$i]['reference'] = $item["referenceValue"];
                    $list[$i]['formfield'] = self::arrayToJson($item);
                    $list[$i]['showorder'] = str_pad($item['showOrder'],2,'0',STR_PAD_LEFT);
                    $i++;
                }

                $rows = $list;

                $rows = self::sorterArray($rows,'showorder');
            }

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectItem(array $data) {
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $itembasetype = $data['itembasetype'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            SELECT TOP 50
                ib.id,
                ib.id as itembaseid,
                ib.name as itembasename,
                ib.description,
                ib.barcode,
                ib.itembasetype,
                ib.registrationanvisa,
                ib.manufacturerid,
                mf.name as manufacturername,
                e.cmeareasid,
                e.cmeareasname,
                dbo.binary2base64(ib.filedata) as filedata,
                ib.fileinfo
            FROM
                itembase ib
                inner join manufacturer mf on ( mf.id = ib.manufacturerid )
                outer apply (
                    select
                        e.cmeareasid,
                        a.name as cmeareasname
                    from
                        equipment e
                        inner join areas a on ( a.id = e.cmeareasid )
                    where e.id = ib.id
                ) e
            WHERE ib.isactive = 1
              and ib.itembasetype = :itembasetype
              and ( ib.name LIKE :name OR ib.barcode = :barcode )";

        try {
            $pdo = $proxy->prepare($sql);

            $query = "%{$query}%";

            $pdo->bindValue(":name", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":barcode", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":itembasetype", $itembasetype, \PDO::PARAM_STR);

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