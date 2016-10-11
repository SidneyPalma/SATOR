<?php

namespace iSterilization\Event;

use Smart\Utils\Session;

class armorymovementitem extends \Smart\Data\Event {

    /**
     * @param \iSterilization\Model\armorymovementitem $model
     */
    public function preInsert( \iSterilization\Model\armorymovementitem &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\armorymovementitem $model
     */
    public function posInsert( \iSterilization\Model\armorymovementitem &$model ) {

    }

    /**
     * @param \iSterilization\Model\armorymovementitem $model
     */
    public function preUpdate( \iSterilization\Model\armorymovementitem &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\armorymovementitem $model
     */
    public function posUpdate( \iSterilization\Model\armorymovementitem &$model ) {
    }

    /**
     * @param \iSterilization\Model\armorymovementitem $model
     */
    public function preDelete( \iSterilization\Model\armorymovementitem &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\armorymovementitem $model
     */
    public function posDelete( \iSterilization\Model\armorymovementitem &$model ) {

    }

}