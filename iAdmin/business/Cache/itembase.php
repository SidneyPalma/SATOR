<?php

namespace iAdmin\Cache;

use iAdmin\Model\itembase as Model;

class itembase extends \Smart\Data\Cache {

    public function selectData(array $data) {
        $list = array();
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

		$sql = "SELECT coalesce(resultfields,'{}') as datafield FROM itembase WHERE id = :id";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":id", $query, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();

			$datafield = $rows[0]['datafield'];

            $i = 0;
            $base = self::jsonToArray($datafield);

            foreach ($base as $item) {
                $list[$i]['id'] = $i+1;
                $list[$i]['itembaseid'] = $query;
                $list[$i]['datafield'] = $datafield;
                $list[$i]['showorder'] = isset($item['showorder']) ? $item['showorder'] : '';
                $list[$i]['fieldname'] = isset($item['fieldname']) ? $item['fieldname'] : '';
                $list[$i]['datavalue'] = isset($item['datavalue']) ? $item['datavalue'] : '';
                $list[$i]['reference'] = isset($item['reference']) ? $item['reference'] : '';
                $list[$i]['formfield'] = isset($item['formfield']) ? $item['formfield'] : '';
                $i++;
            }

            self::_setRows($base);

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