<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class unitmeasurement extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\unitmeasurement $model
     */
    public function preInsert( \iAdmin\Model\unitmeasurement &$model ) {
        Session::hasProfile('8ACCF18A-58BE-451A-A659-8A2ED08F1620','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');
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
        Session::hasProfile('8ACCF18A-58BE-451A-A659-8A2ED08F1620','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
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
        Session::hasProfile('8ACCF18A-58BE-451A-A659-8A2ED08F1620','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\unitmeasurement $model
     */
    public function posDelete( \iAdmin\Model\unitmeasurement &$model ) {

    }

}