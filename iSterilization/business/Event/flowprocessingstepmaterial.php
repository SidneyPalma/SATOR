<?php

namespace iSterilization\Event;

use Smart\Utils\Session;

class flowprocessingstepmaterial extends \Smart\Data\Event {

    /**
     * @param \iSterilization\Model\flowprocessingstepmaterial $model
     */
    public function preInsert( \iSterilization\Model\flowprocessingstepmaterial &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessingstepmaterial $model
     */
    public function posInsert( \iSterilization\Model\flowprocessingstepmaterial &$model ) {

    }

    /**
     * @param \iSterilization\Model\flowprocessingstepmaterial $model
     */
    public function preUpdate( \iSterilization\Model\flowprocessingstepmaterial &$model ) {
        Session::hasProfile('','');

        $dateto = date("Y-m-d H:i");
        $model->set('dateto',$dateto);
    }

    /**
     * @param \iSterilization\Model\flowprocessingstepmaterial $model
     */
    public function posUpdate( \iSterilization\Model\flowprocessingstepmaterial &$model ) {

    }

    /**
     * @param \iSterilization\Model\flowprocessingstepmaterial $model
     */
    public function preDelete( \iSterilization\Model\flowprocessingstepmaterial &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessingstepmaterial $model
     */
    public function posDelete( \iSterilization\Model\flowprocessingstepmaterial &$model ) {

    }

}