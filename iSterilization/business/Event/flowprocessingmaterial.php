<?php

namespace iSterilization\Event;

use Smart\Utils\Session;

class flowprocessingmaterial extends \Smart\Data\Event {

    /**
     * @param \iSterilization\Model\flowprocessingmaterial $model
     */
    public function preInsert( \iSterilization\Model\flowprocessingmaterial &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessingmaterial $model
     */
    public function posInsert( \iSterilization\Model\flowprocessingmaterial &$model ) {

    }

    /**
     * @param \iSterilization\Model\flowprocessingmaterial $model
     */
    public function preUpdate( \iSterilization\Model\flowprocessingmaterial &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessingmaterial $model
     */
    public function posUpdate( \iSterilization\Model\flowprocessingmaterial &$model ) {
    }

    /**
     * @param \iSterilization\Model\flowprocessingmaterial $model
     */
    public function preDelete( \iSterilization\Model\flowprocessingmaterial &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessingmaterial $model
     */
    public function posDelete( \iSterilization\Model\flowprocessingmaterial &$model ) {

    }

}