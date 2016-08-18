<?php

namespace iSterilization\Event;

use Smart\Utils\Session;

class flowprocessingstepinput extends \Smart\Data\Event {

    /**
     * @param \iSterilization\Model\flowprocessingstepinput $model
     */
    public function preInsert( \iSterilization\Model\flowprocessingstepinput &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessingstepinput $model
     */
    public function posInsert( \iSterilization\Model\flowprocessingstepinput &$model ) {

    }

    /**
     * @param \iSterilization\Model\flowprocessingstepinput $model
     */
    public function preUpdate( \iSterilization\Model\flowprocessingstepinput &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessingstepinput $model
     */
    public function posUpdate( \iSterilization\Model\flowprocessingstepinput &$model ) {
    }

    /**
     * @param \iSterilization\Model\flowprocessingstepinput $model
     */
    public function preDelete( \iSterilization\Model\flowprocessingstepinput &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessingstepinput $model
     */
    public function posDelete( \iSterilization\Model\flowprocessingstepinput &$model ) {

    }

}