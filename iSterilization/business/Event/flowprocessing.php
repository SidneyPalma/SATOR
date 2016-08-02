<?php

namespace iSterilization\Event;

use Smart\Utils\Session;

class flowprocessing extends \Smart\Data\Event {

    /**
     * @param \iSterilization\Model\flowprocessing $model
     */
    public function preInsert( \iSterilization\Model\flowprocessing &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessing $model
     */
    public function posInsert( \iSterilization\Model\flowprocessing &$model ) {
    }

    /**
     * @param \iSterilization\Model\flowprocessing $model
     */
    public function preUpdate( \iSterilization\Model\flowprocessing &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessing $model
     */
    public function posUpdate( \iSterilization\Model\flowprocessing &$model ) {
    }

    /**
     * @param \iSterilization\Model\flowprocessing $model
     */
    public function preDelete( \iSterilization\Model\flowprocessing &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessing $model
     */
    public function posDelete( \iSterilization\Model\flowprocessing &$model ) {

    }

}