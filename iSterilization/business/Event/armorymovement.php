<?php

namespace iSterilization\Event;

use Smart\Utils\Session;

class armorymovement extends \Smart\Data\Event {

    /**
     * @param \iSterilization\Model\armorymovement $model
     */
    public function preInsert( \iSterilization\Model\armorymovement &$model ) {
        Session::hasProfile('','');

        $this->valInsert($model);
    }

    /**
     * Validar Abertura de movimento
     * @param $model
     */
    public function valInsert($model) {
        $areasid = $model->getAreasid();

        $sql = "
            declare
                @areasid int = :areasid,
                @releasestype char(1) = :releasestype;

            select
                count(id) as releasesitem
            from
                armorymovement
            where areasid = @areasid
              and releasestype = @releasestype";

        $pdo = $this->getProxy()->prepare($sql);
        $pdo->bindValue(":areasid", $areasid, \PDO::PARAM_INT);
        $pdo->bindValue(":releasestype", "A", \PDO::PARAM_STR);

        $pdo->execute();
        $rows = $pdo->fetchAll();
        $releasesitem = $rows[0]['releasesitem'];

        if( intval($releasesitem) >= 3 ) {
            throw new \PDOException("Este movimento não pode ser criado pois existem {$releasesitem} abertos!");
        }
    }

    /**
     * @param \iSterilization\Model\armorymovement $model
     */
    public function posInsert( \iSterilization\Model\armorymovement &$model ) {

    }

    /**
     * @param \iSterilization\Model\armorymovement $model
     */
    public function preUpdate( \iSterilization\Model\armorymovement &$model ) {
        Session::hasProfile('','');

        $this->setUpdate($model);
    }

    /**
     * Validar Encerramento de movimento
     * @param $model
     */
    public function setUpdate($model) {
        $id = $model->get('id');
        $newreleasestype = $model->get('releasestype');

        $data = array("query"=>$id);

        $masterCoach = new \iSterilization\Coach\armorymovement();
        $detailCoach = new \iSterilization\Coach\armorymovementitem();
        $master = self::jsonToObject($masterCoach->getStore()->select());
        $detail = self::jsonToObject($detailCoach->getStore()->getCache()->selectItem($data));

        if(count($detail->rows) == 0 && $newreleasestype != "C") {
            throw new \PDOException("O Movimento não pode ser encerrado pois <b>não existem lançamentos!</b>");
        }

        $oldreleasestype = $master->rows[0]->releasestype;

        if($oldreleasestype !== $newreleasestype && $newreleasestype == "E") {

            $proxy = $masterCoach->getStore()->getProxy();
            $stock = new \iSterilization\Coach\armorystock();

            try {
                $proxy->beginTransaction();

                foreach ($detail->rows as $item) {
                    $stock->getStore()->getModel()->set('id','');
                    $stock->getStore()->getModel()->set('flowprocessingstepid',$item->flowprocessingstepid);
                    $stock->getStore()->getModel()->set('armorylocal',$item->armorylocal);
                    $stock->getStore()->getModel()->set('armorystatus','A');
                    $result = self::jsonToObject($stock->getStore()->insert());

                    if($result->success == false) {
                        throw new \PDOException($result->text);
                        break;
                    }
                }

                $proxy->commit();
            } catch ( \PDOException $e ) {
                if ($proxy->inTransaction()) {
                    $proxy->rollBack();
                }
                throw new \PDOException($e->getMessage());
            }
        }
    }

    /**
     * @param \iSterilization\Model\armorymovement $model
     */
    public function posUpdate( \iSterilization\Model\armorymovement &$model ) {
    }

    /**
     * @param \iSterilization\Model\armorymovement $model
     */
    public function preDelete( \iSterilization\Model\armorymovement &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\armorymovement $model
     */
    public function posDelete( \iSterilization\Model\armorymovement &$model ) {

    }

}