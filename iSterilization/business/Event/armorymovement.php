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