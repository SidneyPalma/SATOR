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
				sti.inputpresentationid,
                ib.name as inputname,
                sti.presentation,
                dbo.getEnum('presentation',sti.presentation) as presentationdescription
            FROM
                sterilizationtypeinput sti
				inner join inputpresentation ip on ( ip.id = sti.inputpresentationid )
                inner join input i on ( i.id = ip.inputid )
                inner join itembase ib on ( ib.id = i.id )
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