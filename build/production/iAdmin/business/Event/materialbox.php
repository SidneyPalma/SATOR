<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class materialbox extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\materialbox $model
     */
    public function preInsert( \iAdmin\Model\materialbox &$model ) {
        Session::hasProfile('','');

        $model->set('statusbox','000');
    }

    /**
     * @param \iAdmin\Model\materialbox $model
     */
    public function posInsert( \iAdmin\Model\materialbox &$model ) {

    }

    /**
     * @param \iAdmin\Model\materialbox $model
     */
    public function preUpdate( \iAdmin\Model\materialbox &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\materialbox $model
     */
    public function posUpdate( \iAdmin\Model\materialbox &$model ) {
    }

    /**
     * @param \iAdmin\Model\materialbox $model
     */
    public function preDelete( \iAdmin\Model\materialbox &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\materialbox $model
     */
    public function posDelete( \iAdmin\Model\materialbox &$model ) {

    }

}