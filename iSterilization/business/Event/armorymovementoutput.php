<?php

namespace iSterilization\Event;

use Smart\Utils\Session;

class armorymovementoutput extends \Smart\Data\Event {

    /**
     * @param \iSterilization\Model\armorymovementoutput $model
     */
    public function preInsert( \iSterilization\Model\armorymovementoutput &$model ) {
        Session::hasProfile('','');

        $surgicalwarning = $model->get('surgicalwarning');

        $armorymovement = new \iSterilization\Coach\armorymovement();
        $armorymovement->getStore()->getModel()->set('id','');
        $armorymovement->getStore()->getModel()->set('movementtype','002');
        $armorymovement->getStore()->getModel()->set('releasestype','A');
        $armorymovement->update();

        $id = $armorymovement->getStore()->getModel()->getId();

        //Gerando BarCode
        $utimestamp = microtime(true);
        $timestamp = floor($utimestamp);
        $milliseconds = round(($utimestamp - $timestamp) * 1000000);
        $barcode = substr("O" . date("YmdHis") . $milliseconds,0,20);

        $model->setId($id);
        $model->setHasbox('1');
        $model->setBarcode($barcode);

        if( !isset($surgicalwarning) || strlen($surgicalwarning) == 0) {
            $model->set('hasbox',null);
            $model->set('patientname',null);
            $model->set('surgicalwarning',null);
            $model->set('instrumentator',null);
            $model->set('flowing',null);
            $model->set('place',null);
            $model->set('transportedby',null);
            $model->set('surgicalroom',null);
            $model->set('surgical',null);
        }

        if(strlen($id) == 0) {
            throw new \PDOException('Não foi possível inserir o registro!');
        }
    }

    /**
     * @param \iSterilization\Model\armorymovementoutput $model
     */
    public function posInsert( \iSterilization\Model\armorymovementoutput &$model ) {

    }

    /**
     * @param \iSterilization\Model\armorymovementoutput $model
     */
    public function preUpdate( \iSterilization\Model\armorymovementoutput &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\armorymovementoutput $model
     */
    public function posUpdate( \iSterilization\Model\armorymovementoutput &$model ) {
    }

    /**
     * @param \iSterilization\Model\armorymovementoutput $model
     */
    public function preDelete( \iSterilization\Model\armorymovementoutput &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\armorymovementoutput $model
     */
    public function posDelete( \iSterilization\Model\armorymovementoutput &$model ) {

    }

}