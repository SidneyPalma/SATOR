<?php

namespace iAdmin\Cache;

use iAdmin\Model\itembase as Model;

class itembase extends \Smart\Data\Cache {

    public function selectData(array $data) {
        $list = array();
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

		$sql = "
            SELECT
                ib.resultfield
            FROM
                itembase ib
            WHERE ib.id = :id
              and ib.resultfield is not null";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":id", $query, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = self::encodeUTF8($pdo->fetchAll());

            if(count($rows) != 0) {
                $resultfield = $rows[0]['resultfield'];

                $i = 0;
                $base = self::jsonToArray($resultfield);

                foreach ($base as $item) {
                    $list[$i]['id'] = $i+1;
                    $list[$i]['formfield'] = self::arrayToJson($item);
                    $list[$i]['fieldname'] = $item['name'];
                    $list[$i]['fieldtext'] = $item['displayName'];
                    $list[$i]['datavalue'] = $item['defaultValue'];
                    $list[$i]['reference'] = $item["referenceValue"];
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

        $sql = "SELECT " .implode(',', $f). " FROM itembase WHERE " . implode(' OR ', $p);

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

}