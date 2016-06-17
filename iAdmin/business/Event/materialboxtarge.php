<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class materialboxtarge extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\materialboxtarge $model
     */
    public function preInsert( \iAdmin\Model\materialboxtarge &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\materialboxtarge $model
     */
    public function posInsert( \iAdmin\Model\materialboxtarge &$model ) {

    }

    /**
     * @param \iAdmin\Model\materialboxtarge $model
     */
    public function preUpdate( \iAdmin\Model\materialboxtarge &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\materialboxtarge $model
     */
    public function posUpdate( \iAdmin\Model\materialboxtarge &$model ) {
    }

    /**
     * @param \iAdmin\Model\materialboxtarge $model
     */
    public function preDelete( \iAdmin\Model\materialboxtarge &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\materialboxtarge $model
     */
    public function posDelete( \iAdmin\Model\materialboxtarge &$model ) {

    }

}