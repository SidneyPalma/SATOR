<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class inputstock extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\inputstock $model
     */
    public function preInsert( \iAdmin\Model\inputstock &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\inputstock $model
     */
    public function posInsert( \iAdmin\Model\inputstock &$model ) {

    }

    /**
     * @param \iAdmin\Model\inputstock $model
     */
    public function preUpdate( \iAdmin\Model\inputstock &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\inputstock $model
     */
    public function posUpdate( \iAdmin\Model\inputstock &$model ) {
    }

    /**
     * @param \iAdmin\Model\inputstock $model
     */
    public function preDelete( \iAdmin\Model\inputstock &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\inputstock $model
     */
    public function posDelete( \iAdmin\Model\inputstock &$model ) {

    }

}