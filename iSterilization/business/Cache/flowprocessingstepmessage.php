<?php

namespace iSterilization\Cache;

use iSterilization\Model\flowprocessingstepmessage as Model;

class flowprocessingstepmessage extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                fpm.id,
                fpm.flowprocessingstepid,
                fpm.readertext,
                fpm.readerdate,
                fpm.readercode,
                fpm.readerdate
            from
                flowprocessingstepmessage fpm
            where fpm.flowprocessingstepid = :flowprocessingstepid
            order by fpm.id desc";

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