<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class materialcycle extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\materialcycle $model
     */
    public function preInsert( \iAdmin\Model\materialcycle &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\materialcycle $model
     */
    public function posInsert( \iAdmin\Model\materialcycle &$model ) {

    }

    /**
     * @param \iAdmin\Model\materialcycle $model
     */
    public function preUpdate( \iAdmin\Model\materialcycle &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\materialcycle $model
     */
    public function posUpdate( \iAdmin\Model\materialcycle &$model ) {
    }

    /**
     * @param \iAdmin\Model\materialcycle $model
     */
    public function preDelete( \iAdmin\Model\materialcycle &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\materialcycle $model
     */
    public function posDelete( \iAdmin\Model\materialcycle &$model ) {

    }

}