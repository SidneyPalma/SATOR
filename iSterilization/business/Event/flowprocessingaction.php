<?php

namespace iSterilization\Event;

use Smart\Utils\Session;

class flowprocessingaction extends \Smart\Data\Event {

    /**
     * @param \iSterilization\Model\flowprocessingaction $model
     */
    public function preInsert( \iSterilization\Model\flowprocessingaction &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessingaction $model
     */
    public function posInsert( \iSterilization\Model\flowprocessingaction &$model ) {

    }

    /**
     * @param \iSterilization\Model\flowprocessingaction $model
     */
    public function preUpdate( \iSterilization\Model\flowprocessingaction &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessingaction $model
     */
    public function posUpdate( \iSterilization\Model\flowprocessingaction &$model ) {
    }

    /**
     * @param \iSterilization\Model\flowprocessingaction $model
     */
    public function preDelete( \iSterilization\Model\flowprocessingaction &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessingaction $model
     */
    public function posDelete( \iSterilization\Model\flowprocessingaction &$model ) {

    }

}