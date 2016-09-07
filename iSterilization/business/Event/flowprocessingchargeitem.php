<?php

namespace iSterilization\Event;

use Smart\Utils\Session;

class flowprocessingchargeitem extends \Smart\Data\Event {

    /**
     * @param \iSterilization\Model\flowprocessingchargeitem $model
     */
    public function preInsert( \iSterilization\Model\flowprocessingchargeitem &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessingchargeitem $model
     */
    public function posInsert( \iSterilization\Model\flowprocessingchargeitem &$model ) {

    }

    /**
     * @param \iSterilization\Model\flowprocessingchargeitem $model
     */
    public function preUpdate( \iSterilization\Model\flowprocessingchargeitem &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessingchargeitem $model
     */
    public function posUpdate( \iSterilization\Model\flowprocessingchargeitem &$model ) {
    }

    /**
     * @param \iSterilization\Model\flowprocessingchargeitem $model
     */
    public function preDelete( \iSterilization\Model\flowprocessingchargeitem &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessingchargeitem $model
     */
    public function posDelete( \iSterilization\Model\flowprocessingchargeitem &$model ) {

    }

}