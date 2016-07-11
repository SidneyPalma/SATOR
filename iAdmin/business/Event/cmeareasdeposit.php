<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class cmeareasdeposit extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\cmeareasdeposit $model
     */
    public function preInsert( \iAdmin\Model\cmeareasdeposit &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\cmeareasdeposit $model
     */
    public function posInsert( \iAdmin\Model\cmeareasdeposit &$model ) {

    }

    /**
     * @param \iAdmin\Model\cmeareasdeposit $model
     */
    public function preUpdate( \iAdmin\Model\cmeareasdeposit &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\cmeareasdeposit $model
     */
    public function posUpdate( \iAdmin\Model\cmeareasdeposit &$model ) {
    }

    /**
     * @param \iAdmin\Model\cmeareasdeposit $model
     */
    public function preDelete( \iAdmin\Model\cmeareasdeposit &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\cmeareasdeposit $model
     */
    public function posDelete( \iAdmin\Model\cmeareasdeposit &$model ) {

    }

}