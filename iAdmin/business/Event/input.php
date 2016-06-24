<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class input extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\input $model
     */
    public function preInsert( \iAdmin\Model\input &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\input $model
     */
    public function posInsert( \iAdmin\Model\input &$model ) {
        $this->getProxy()->setUpload($model);
    }

    /**
     * @param \iAdmin\Model\input $model
     */
    public function preUpdate( \iAdmin\Model\input &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\input $model
     */
    public function posUpdate( \iAdmin\Model\input &$model ) {
    }

    /**
     * @param \iAdmin\Model\input $model
     */
    public function preDelete( \iAdmin\Model\input &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\input $model
     */
    public function posDelete( \iAdmin\Model\input &$model ) {

    }

}