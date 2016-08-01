<?php

namespace iSterilization\Cache;

use iSterilization\Model\flowprocessingaction as Model;

class flowprocessingaction extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                fps.elementname,
                fpsa.flowstepaction,
                fpsa.flowprocessingstepid,
                dbo.getEnum('flowstepaction',fpsa.flowstepaction) as flowstepactiondescription
            from 
                flowprocessingaction fpsa
                inner join flowprocessingstep fps on ( fps.id = fpsa.flowprocessingstepid )
            where fpsa.flowprocessingstepid = :flowprocessingstepid";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":flowprocessingstepid", $query, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);
            self::_setSuccess(count($rows) != 0);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

}