<?php

namespace iAdmin\Cache;

use iAdmin\Model\movimentitem as Model;

class movimentitem extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $query = $data['query'];

        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                mi.*,
                i.name as inputname,
                ip.acronym,
                ip.measurebase,
                dbo.getEnum('presentation',ip.presentation) as presentationdescription
            from
                movimentitem mi
                inner join input i on ( i.id = mi.inputid )
                inner join inputpresentation ip on ( ip.inputid = i.id and mi.presentation = ip.presentation )
            where mi.movimentid = :movimentid";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":movimentid", $query, \PDO::PARAM_INT);

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