<?php

namespace iSterilization\Event;

use Smart\Utils\Session;

class armorymovementoutput extends \Smart\Data\Event {

    /**
     * @param \iSterilization\Model\armorymovementoutput $model
     */
    public function preInsert( \iSterilization\Model\armorymovementoutput &$model ) {
        Session::hasProfile('','');
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