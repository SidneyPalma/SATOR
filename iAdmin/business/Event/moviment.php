<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class moviment extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\moviment $model
     */
    public function preInsert( \iAdmin\Model\moviment &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\moviment $model
     */
    public function posInsert( \iAdmin\Model\moviment &$model ) {

    }

    /**
     * @param \iAdmin\Model\moviment $model
     */
    public function preUpdate( \iAdmin\Model\moviment &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\moviment $model
     */
    public function posUpdate( \iAdmin\Model\moviment &$model ) {
    }

    /**
     * @param \iAdmin\Model\moviment $model
     */
    public function preDelete( \iAdmin\Model\moviment &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\moviment $model
     */
    public function posDelete( \iAdmin\Model\moviment &$model ) {

    }

}