<?php

namespace iAdmin\Cache;

use iAdmin\Model\inputpresentation as Model;

class inputpresentation extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $query = $data['query'];

        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                ip.id,
                :inputid as inputid,
                ip.acronym,
                ip.measurebase,
                etl.code as presentation,
                etl.description + ' (' + etl.filtertype + ')' as presentationdescription,
                etl.filtertype
            from
                enumtype et
                inner join enumtypelist etl on ( etl.enumtypeid = et.id )
                left join inputpresentation ip on ( ip.presentation = etl.code and ip.inputid = :query)
            where et.name = 'presentation'
            order by etl.code";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":query", $query, \PDO::PARAM_INT);
            $pdo->bindValue(":inputid", $query, \PDO::PARAM_INT);

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