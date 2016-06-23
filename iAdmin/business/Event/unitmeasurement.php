<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class unitmeasurement extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\unitmeasurement $model
     */
    public function preInsert( \iAdmin\Model\unitmeasurement &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\unitmeasurement $model
     */
    public function posInsert( \iAdmin\Model\unitmeasurement &$model ) {

    }

    /**
     * @param \iAdmin\Model\unitmeasurement $model
     */
    public function preUpdate( \iAdmin\Model\unitmeasurement &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\unitmeasurement $model
     */
    public function posUpdate( \iAdmin\Model\unitmeasurement &$model ) {
    }

    /**
     * @param \iAdmin\Model\unitmeasurement $model
     */
    public function preDelete( \iAdmin\Model\unitmeasurement &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\unitmeasurement $model
     */
    public function posDelete( \iAdmin\Model\unitmeasurement &$model ) {

    }

}