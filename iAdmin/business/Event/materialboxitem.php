<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class materialboxitem extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\materialboxitem $model
     */
    public function preInsert( \iAdmin\Model\materialboxitem &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\materialboxitem $model
     */
    public function posInsert( \iAdmin\Model\materialboxitem &$model ) {

    }

    /**
     * @param \iAdmin\Model\materialboxitem $model
     */
    public function preUpdate( \iAdmin\Model\materialboxitem &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\materialboxitem $model
     */
    public function posUpdate( \iAdmin\Model\materialboxitem &$model ) {
    }

    /**
     * @param \iAdmin\Model\materialboxitem $model
     */
    public function preDelete( \iAdmin\Model\materialboxitem &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\materialboxitem $model
     */
    public function posDelete( \iAdmin\Model\materialboxitem &$model ) {

    }

}