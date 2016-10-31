<?php

namespace iAdmin\Cache;

use iAdmin\Model\materialboxtarge as Model;

class materialboxtarge extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                mbt.id,
                mbt.materialboxid,
                mbt.targecolorid,
                mbt.targeorderby,
                tc.name as targecolorname,
                colorschema = ',#' + tc.colorschema + '|#' + tc.colorstripe
            from
                materialboxtarge mbt
                inner join targecolor tc on ( tc.id = mbt.targecolorid )
            where mbt.materialboxid = :id";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":id", $query, \PDO::PARAM_INT);

            $pdo->execute();
            $rows = $pdo->fetchAll();

            $node = array();
            $list = array(
                array("targeorderby"=>'1'),
                array("targeorderby"=>'2'),
                array("targeorderby"=>'3'),
                array("targeorderby"=>'4')
            );

            foreach ($list as $item) {
                $find = self::searchArray($rows,"targeorderby",$item["targeorderby"]);
                if(!$find) {
                    $pos = count($node);
                    $node[$pos]['id'] = '';
                    $node[$pos]['materialboxid'] = intval($query);
                    $node[$pos]['targecolorid'] = '';
                    $node[$pos]['targeorderby'] = $item["targeorderby"];
                    $node[$pos]['targecolorname'] = '';
                    $node[$pos]['colorschema'] = '';
                }
            }

            $rows = self::sorterArray(array_merge($rows,$node),'targeorderby');

            for ($x = 0; $x <= count($list)-1; $x++) {
                $rows[$x]['materialboxid'] = $query;
                $rows[$x]['colorcode'] = $rows[$x]['targeorderby'];
                $rows[$x]['colorname'] = "Cor#" . $rows[$x]['targeorderby'];
            }

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

}