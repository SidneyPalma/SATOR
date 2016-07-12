<?php

namespace iAdmin\Cache;

use iAdmin\Model\inputpresentation as Model;

class inputpresentation extends \Smart\Data\Cache {

    public function selectLike(array $data) {
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            SELECT
                ip.id,
                ib.name,
                ip.acronym,
                ip.presentation,
                dbo.getEnum('presentation',ip.presentation) as presentationdescription
            FROM
                itembase ib
                inner join input i on ( i.id = ib.id )
                inner join inputpresentation ip on ( ip.inputid = i.id )
            WHERE ib.name LIKE :name
              and ib.isactive = 1";

        try {
            $pdo = $proxy->prepare($sql);

            $query = "%{$query}%";

            $pdo->bindValue(":name", $query, \PDO::PARAM_STR);

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