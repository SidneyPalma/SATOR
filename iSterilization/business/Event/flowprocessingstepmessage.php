<?php

namespace iSterilization\Event;

use Smart\Utils\Session;

class flowprocessingstepmessage extends \Smart\Data\Event {

    /**
     * @param \iSterilization\Model\flowprocessingstepmessage $model
     */
    public function preInsert( \iSterilization\Model\flowprocessingstepmessage &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessingstepmessage $model
     */
    public function posInsert( \iSterilization\Model\flowprocessingstepmessage &$model ) {

    }

    /**
     * @param \iSterilization\Model\flowprocessingstepmessage $model
     */
    public function preUpdate( \iSterilization\Model\flowprocessingstepmessage &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessingstepmessage $model
     */
    public function posUpdate( \iSterilization\Model\flowprocessingstepmessage &$model ) {
    }

    /**
     * @param \iSterilization\Model\flowprocessingstepmessage $model
     */
    public function preDelete( \iSterilization\Model\flowprocessingstepmessage &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessingstepmessage $model
     */
    public function posDelete( \iSterilization\Model\flowprocessingstepmessage &$model ) {

    }

}