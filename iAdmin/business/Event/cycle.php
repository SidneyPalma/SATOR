<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class cycle extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\cycle $model
     */
    public function preInsert( \iAdmin\Model\cycle &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\cycle $model
     */
    public function posInsert( \iAdmin\Model\cycle &$model ) {

    }

    /**
     * @param \iAdmin\Model\cycle $model
     */
    public function preUpdate( \iAdmin\Model\cycle &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\cycle $model
     */
    public function posUpdate( \iAdmin\Model\cycle &$model ) {
    }

    /**
     * @param \iAdmin\Model\cycle $model
     */
    public function preDelete( \iAdmin\Model\cycle &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\cycle $model
     */
    public function posDelete( \iAdmin\Model\cycle &$model ) {

    }

}