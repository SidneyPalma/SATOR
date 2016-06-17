<?php

namespace iAdmin\Event;

class module extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\module $model
     */
    public function preInsert( \iAdmin\Model\module &$model ) {

    }

    /**
     * @param \iAdmin\Model\module $model
     */
    public function posInsert( \iAdmin\Model\module &$model ) {
        $this->getProxy()->setUpload($model);
    }

    /**
     * @param \iAdmin\Model\module $model
     */
    public function preUpdate( \iAdmin\Model\module &$model ) {

    }

    /**
     * @param \iAdmin\Model\module $model
     */
    public function posUpdate( \iAdmin\Model\module &$model ) {
        $this->getProxy()->setUpload($model);
    }

    /**
     * @param \iAdmin\Model\module $model
     */
    public function preDelete( \iAdmin\Model\module &$model ) {

    }

    /**
     * @param \iAdmin\Model\module $model
     */
    public function posDelete( \iAdmin\Model\module &$model ) {

    }

}