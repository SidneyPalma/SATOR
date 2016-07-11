<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class cmesubareasdeposit extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\cmesubareasdeposit $model
     */
    public function preInsert( \iAdmin\Model\cmesubareasdeposit &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\cmesubareasdeposit $model
     */
    public function posInsert( \iAdmin\Model\cmesubareasdeposit &$model ) {

    }

    /**
     * @param \iAdmin\Model\cmesubareasdeposit $model
     */
    public function preUpdate( \iAdmin\Model\cmesubareasdeposit &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\cmesubareasdeposit $model
     */
    public function posUpdate( \iAdmin\Model\cmesubareasdeposit &$model ) {
    }

    /**
     * @param \iAdmin\Model\cmesubareasdeposit $model
     */
    public function preDelete( \iAdmin\Model\cmesubareasdeposit &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\cmesubareasdeposit $model
     */
    public function posDelete( \iAdmin\Model\cmesubareasdeposit &$model ) {

    }

}