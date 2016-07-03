<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class cmeareasstock extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\cmeareasstock $model
     */
    public function preInsert( \iAdmin\Model\cmeareasstock &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\cmeareasstock $model
     */
    public function posInsert( \iAdmin\Model\cmeareasstock &$model ) {

    }

    /**
     * @param \iAdmin\Model\cmeareasstock $model
     */
    public function preUpdate( \iAdmin\Model\cmeareasstock &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\cmeareasstock $model
     */
    public function posUpdate( \iAdmin\Model\cmeareasstock &$model ) {
    }

    /**
     * @param \iAdmin\Model\cmeareasstock $model
     */
    public function preDelete( \iAdmin\Model\cmeareasstock &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\cmeareasstock $model
     */
    public function posDelete( \iAdmin\Model\cmeareasstock &$model ) {

    }

}