<?php

namespace iAdmin\Cache;

use iAdmin\Model\itembaseservicetype as Model;

class itembaseservicetype extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                ibst.id,
                :itembaseid as itembaseid,
                etl.code as servicetype,
                etl.description as servicetypedescription,
                case coalesce(ibst.id,0) when 0 then 0 else 1 end as isactive
            from
                enumtype et
                inner join enumtypelist etl on ( etl.enumtypeid = et.id )
                left join itembaseservicetype ibst on ( ibst.servicetype = etl.code and ibst.itembaseid = :id )
            where et.name = 'servicetype'
            order by etl.orderby";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":id", $query, \PDO::PARAM_INT);
            $pdo->bindValue(":itembaseid", $query, \PDO::PARAM_INT);

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