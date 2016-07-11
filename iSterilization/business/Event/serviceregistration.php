<?php

namespace iSterilization\Event;

use Smart\Utils\Session;

class serviceregistration extends \Smart\Data\Event {

    /**
     * @param \iSterilization\Model\serviceregistration $model
     */
    public function preInsert( \iSterilization\Model\serviceregistration &$model ) {
        $date = date('Y-m-d');
        $user = $this->getProxy()->session->username;

        Session::hasProfile('','');

		$model->set('begintime',$date);
		$model->set('resultstate','L');
		$model->set('begintimeusername',$user);
    }

    /**
     * @param \iSterilization\Model\serviceregistration $model
     */
    public function posInsert( \iSterilization\Model\serviceregistration &$model ) {

    }

    /**
     * @param \iSterilization\Model\serviceregistration $model
     */
    public function preUpdate( \iSterilization\Model\serviceregistration &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\serviceregistration $model
     */
    public function posUpdate( \iSterilization\Model\serviceregistration &$model ) {
    }

    /**
     * @param \iSterilization\Model\serviceregistration $model
     */
    public function preDelete( \iSterilization\Model\serviceregistration &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\serviceregistration $model
     */
    public function posDelete( \iSterilization\Model\serviceregistration &$model ) {

    }

}