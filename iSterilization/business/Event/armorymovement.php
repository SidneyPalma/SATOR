<?php

namespace iSterilization\Event;

use Smart\Utils\Session;

class armorymovement extends \Smart\Data\Event {

    /**
     * @param \iSterilization\Model\armorymovement $model
     */
    public function preInsert( \iSterilization\Model\armorymovement &$model ) {
        Session::hasProfile('','');
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