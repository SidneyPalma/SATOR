<?php

namespace iSterilization\Cache;

use iSterilization\Model\flowprocessingstep as Model;

class flowprocessingstep extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $query = $data['query'];

        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                fps.id, 
                fps.flowprocessingid, 
                fps.steplevel, 
                fps.elementtype, 
                fps.elementname, 
                fps.stepflaglist, 
                fps.stepsettings, 
                fps.areasid, 
                fps.equipmentid, 
                fps.steppriority, 
                fps.source, 
                fps.target
            from
                flowprocessingstep fps
            where fps.flowprocessingid = :flowprocessingid
            order by fps.steplevel";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":flowprocessingid", $query, \PDO::PARAM_INT);

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