<?php

namespace iSterilization\Cache;

use iSterilization\Model\flowprocessingstepinput as Model;

class flowprocessingstepinput extends \Smart\Data\Cache {

    public function selectElement(array $data) {
        $query = $data['query'];
        $flowprocessingid = $data['flowprocessingid'];

        $proxy = $this->getStore()->getProxy();

        $sql = "
            declare
                @flowprocessingid int = :flowprocessingid;
            
            select
                fps.id,
                fps.elementname
            from
                flowprocessingstep fps
            where fps.flowprocessingid = @flowprocessingid
              and ( fps.areasid is not null or fps.equipmentid is not null )
              and fps.elementtype in ('basic.SubArea','basic.Equipment')
              and fps.elementname like :name
            order by 1";

        try {
            $pdo = $proxy->prepare($sql);

            $query = "%{$query}%";

            $pdo->bindValue(":flowprocessingid", $flowprocessingid, \PDO::PARAM_INT);
            $pdo->bindValue(":name", $query, \PDO::PARAM_STR);

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