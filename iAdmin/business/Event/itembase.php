<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class itembase extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\itembase $model
     */
    public function preInsert( \iAdmin\Model\itembase &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\itembase $model
     */
    public function posInsert( \iAdmin\Model\itembase &$model ) {
        $this->getProxy()->setUpload($model);
    }

    /**
     * @param \iAdmin\Model\itembase $model
     */
    public function preUpdate( \iAdmin\Model\itembase &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\itembase $model
     */
    public function posUpdate( \iAdmin\Model\itembase &$model ) {
        $this->getProxy()->setUpload($model);
    }

    /**
     * @param \iAdmin\Model\itembase $model
     */
    public function preDelete( \iAdmin\Model\itembase &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\itembase $model
     */
    public function posDelete( \iAdmin\Model\itembase &$model ) {

    }

}