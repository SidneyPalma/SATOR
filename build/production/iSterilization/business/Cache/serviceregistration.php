<?php

namespace iSterilization\Cache;

use iSterilization\Model\serviceregistration as Model;

class serviceregistration extends \Smart\Data\Cache {

    public function selectData(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                sr.id,
                ib.resultfields as resultfield,
                sr.resultvalue
            from
                serviceregistration sr
                left join itembase ib on ( ib.id = sr.itembaseid )
            where sr.id = :id
              and ib.resultfields is not null";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":id", $query, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            if(count($rows) != 0) {
                $resultfield = $rows[0]['resultfield'];

                $i = 0;
                $base = self::jsonToArray($resultfield);

                foreach ($base as $item) {
                    $list[$i]['id'] = $i+1;
                    $list[$i]['fieldtext'] = $item['displayName'];
                    $list[$i]['fieldname'] = $item["editor"]['name'];
                    $list[$i]['datavalue'] = $item["editor"]['defaultValue'];
                    $list[$i]['reference'] = $item["editor"]["referenceValue"];
                    $list[$i]['formfield'] = self::arrayToJson($item["editor"]);
                    $list[$i]['showorder'] = str_pad($item["editor"]['showOrder'],2,'0',STR_PAD_LEFT);
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

}