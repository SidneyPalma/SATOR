<?php

namespace iAdmin\Cache;

use iAdmin\Model\materialtypeflow as Model;

class materialtypeflow extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $query = $data['query'];

        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                m.id,
                :materialid as materialid,
                m.sterilizationtypeid,
                et.name as sterilizationtypename,
                t.code as prioritylevel,
                t.description as priorityleveldescription
            from
                enumtype e
                inner join enumtypelist t on ( e.id = t.enumtypeid )
                left join materialtypeflow m on ( m.prioritylevel = t.code and m.materialid = :query )
                left join sterilizationtype et on ( et.id = m.sterilizationtypeid )
            where e.name = 'prioritylevel'
            order by t.orderby";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":query", $query, \PDO::PARAM_INT);
            $pdo->bindValue(":materialid", $query, \PDO::PARAM_INT);

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