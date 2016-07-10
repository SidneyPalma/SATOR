<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class input extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\input $model
     */
    public function preInsert( \iAdmin\Model\input &$model ) {
        Session::hasProfile('','');

        $itembase = new \iAdmin\Coach\itembase();
        $itembase->getStore()->getModel()->set('itembasetype','I');
        $itembase->update();

        $id = $itembase->getStore()->getModel()->getId();
        $model->setId($id);

        if(strlen($id) == 0) {
            throw new \PDOException('Não foi possível inserir o registro!');
        }
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
    }

    /**
     * @param \iAdmin\Model\input $model
     */
    public function preUpdate( \iAdmin\Model\input &$model ) {
        Session::hasProfile('','');


        $itembase = new \iAdmin\Coach\itembase();
        $itembase->update();
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