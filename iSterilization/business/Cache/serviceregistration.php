<?php

namespace iSterilization\Cache;

use iSterilization\Model\serviceregistration as Model;

class serviceregistration extends \Smart\Data\Cache {

    public function selectData(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                coalesce(sr.resultvalue,'[]') as resultvalue,
                coalesce(sr.resultfield,ib.resultfields) as resultfield
            from
                serviceregistration sr
                left join itembase ib on ( ib.id = sr.itembaseid )
            where sr.id = :id
              and coalesce(sr.resultfield,ib.resultfields) is not null";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":id", $query, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            if(count($rows) != 0) {
                $resultfield = $rows[0]['resultfield'];
                $resultvalue = $rows[0]['resultvalue'];
                
                $i = 0;
                $base = self::jsonToArray($resultfield);
                $json = self::jsonToArray($resultvalue);

                foreach ($base as $item) {
                    $list[$i]['id'] = $i+1;
                    $recordsValue = $this->removeAccents($json[$i]['value']);
                    $defaultValue = $this->removeAccents($item['defaultValue']);

                    if($this->removeAccents($item['name']) == $this->removeAccents($json[$i]['field'])) {
                        $recordsValue = strlen($recordsValue) != 0 ? $recordsValue : $defaultValue;
                    }

                    $list[$i]['datavalue'] = $recordsValue;
                    $list[$i]['formfield'] = self::arrayToJson($item);
                    $list[$i]['fieldname'] = $this->removeAccents($item['name']);
                    $list[$i]['fieldtext'] = $this->removeAccents($item['displayName']);
                    $list[$i]['reference'] = $this->removeAccents($item["referenceValue"]);
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

}