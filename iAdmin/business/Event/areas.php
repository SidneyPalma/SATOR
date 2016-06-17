<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class areas extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\areas $model
     */
    public function preInsert( \iAdmin\Model\areas &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\areas $model
     */
    public function posInsert( \iAdmin\Model\areas &$model ) {

    }

    /**
     * @param \iAdmin\Model\areas $model
     */
    public function preUpdate( \iAdmin\Model\areas &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\areas $model
     */
    public function posUpdate( \iAdmin\Model\areas &$model ) {
    }

    /**
     * @param \iAdmin\Model\areas $model
     */
    public function preDelete( \iAdmin\Model\areas &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\areas $model
     */
    public function posDelete( \iAdmin\Model\areas &$model ) {

    }

}