<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class itembaseservicetype extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\itembaseservicetype $model
     */
    public function preInsert( \iAdmin\Model\itembaseservicetype &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\itembaseservicetype $model
     */
    public function posInsert( \iAdmin\Model\itembaseservicetype &$model ) {

    }

    /**
     * @param \iAdmin\Model\itembaseservicetype $model
     */
    public function preUpdate( \iAdmin\Model\itembaseservicetype &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\itembaseservicetype $model
     */
    public function posUpdate( \iAdmin\Model\itembaseservicetype &$model ) {
    }

    /**
     * @param \iAdmin\Model\itembaseservicetype $model
     */
    public function preDelete( \iAdmin\Model\itembaseservicetype &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\itembaseservicetype $model
     */
    public function posDelete( \iAdmin\Model\itembaseservicetype &$model ) {

    }

}