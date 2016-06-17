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
                tc.name as targecolorname,
                tc.colorschema
            from
                materialboxtarge mbt
                inner join targecolor tc on ( tc.id = mbt.targecolorid )
            where mbt.materialboxid = :id";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":id", $query, \PDO::PARAM_INT);

            $pdo->execute();
            $rows = $pdo->fetchAll();

            for ($x = 0; $x <= 3; $x++) {
                $i = $x+1;
                $rows[$x]['colorcode'] = $i;
                $rows[$x]['colorname'] = "Cor#$i";
                $rows[$x]['materialboxid'] = $query;
            }

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

}