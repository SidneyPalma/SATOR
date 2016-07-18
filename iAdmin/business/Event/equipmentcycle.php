<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class equipmentcycle extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\equipmentcycle $model
     */
    public function preInsert( \iAdmin\Model\equipmentcycle &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\equipmentcycle $model
     */
    public function posInsert( \iAdmin\Model\equipmentcycle &$model ) {

    }

    /**
     * @param \iAdmin\Model\equipmentcycle $model
     */
    public function preUpdate( \iAdmin\Model\equipmentcycle &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\equipmentcycle $model
     */
    public function posUpdate( \iAdmin\Model\equipmentcycle &$model ) {
    }

    /**
     * @param \iAdmin\Model\equipmentcycle $model
     */
    public function preDelete( \iAdmin\Model\equipmentcycle &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\equipmentcycle $model
     */
    public function posDelete( \iAdmin\Model\equipmentcycle &$model ) {

    }

}