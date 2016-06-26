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
        $id = $model->getId();
        $presentation = $model->getPresentation();

        $inputpresentation = new \iAdmin\Coach\inputpresentation();
        $inputpresentation->getStore()->getModel()->set('id','');
        $inputpresentation->getStore()->getModel()->set('inputid',$id);
        $inputpresentation->getStore()->getModel()->set('presentation',$presentation);
        $inputpresentation->update();

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
        $this->getProxy()->setUpload($model);
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