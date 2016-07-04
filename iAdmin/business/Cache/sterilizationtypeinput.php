<?php

namespace iAdmin\Cache;

use iAdmin\Model\sterilizationtypeinput as Model;

class sterilizationtypeinput extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            SELECT
                sti.id, 
                sti.sterilizationtypeid, 
                sti.inputid,
                i.name as inputname,
                i.presentation,
                dbo.getEnum('presentation',i.presentation) as presentationdescription
            FROM
                sterilizationtypeinput sti
                inner join input i on ( i.id = sti.inputid )
            WHERE sti.sterilizationtypeid = :id";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":id", $query, \PDO::PARAM_INT);

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