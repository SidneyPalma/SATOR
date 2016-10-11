<?php

namespace iSterilization\Event;

use Smart\Utils\Session;

class armorystock extends \Smart\Data\Event {

    /**
     * @param \iSterilization\Model\armorystock $model
     */
    public function preInsert( \iSterilization\Model\armorystock &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\armorystock $model
     */
    public function posInsert( \iSterilization\Model\armorystock &$model ) {

    }

    /**
     * @param \iSterilization\Model\armorystock $model
     */
    public function preUpdate( \iSterilization\Model\armorystock &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\armorystock $model
     */
    public function posUpdate( \iSterilization\Model\armorystock &$model ) {
    }

    /**
     * @param \iSterilization\Model\armorystock $model
     */
    public function preDelete( \iSterilization\Model\armorystock &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\armorystock $model
     */
    public function posDelete( \iSterilization\Model\armorystock &$model ) {

    }

}