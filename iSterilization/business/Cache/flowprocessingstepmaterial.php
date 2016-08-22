<?php

namespace iSterilization\Cache;

use iSterilization\Model\flowprocessingstepmaterial as Model;

class flowprocessingstepmaterial extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                fpm.id, 
                fpm.flowprocessingstepid, 
                fpm.materialid, 
                ib.barcode,
                ib.name as materialname,
                fpm.unconformities, 
                p.name as proprietaryname,
                dbo.getEnum('unconformities',fpm.unconformities) as unconformitiesdescription,
                fpm.dateof,
                fpm.dateto,
                dbo.binary2base64(ib.filedata) as filedata,
                ib.fileinfo
            from
                flowprocessingstepmaterial fpm
                inner join itembase ib on ( ib.id = fpm.materialid )
                inner join proprietary p on ( p.id = ib.proprietaryid ) 
            where fpm.flowprocessingstepid = :flowprocessingstepid";

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

    public function insertItem(array $data) {
        $barcode = $data['barcode'];
        $flowprocessingstepid = $data['flowprocessingstepid'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            SELECT
                ib.id,
				ib.isactive,
				ib.id as materialid,
				ib.name as materialname
            FROM
                itembase ib
                inner join material m on ( m.id = ib.id )
            WHERE ib.barcode COLLATE Latin1_General_CI_AI = :barcode
              and ib.isactive = 1";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":barcode", $barcode, \PDO::PARAM_STR);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            if(count($rows) == 0) {
                throw new \PDOException("O Material solicitado não pôde ser encontrado!");
            }

            $date = date("Y-m-d H:i");
            $material = new \iSterilization\Coach\flowprocessingstepmaterial();
            $material->getStore()->getModel()->set('id','');
            $material->getStore()->getModel()->set('dateof',$date);
            $material->getStore()->getModel()->set('dateto',$date);
            $material->getStore()->getModel()->set('unconformities','010');
            $material->getStore()->getModel()->set('flowprocessingstepid',$flowprocessingstepid);
            $material->getStore()->insert();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

}