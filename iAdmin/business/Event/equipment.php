<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class equipment extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\equipment $model
     */
    public function preInsert( \iAdmin\Model\equipment &$model ) {
        Session::hasProfile('3AF27DA7-29F2-4097-A8A4-F60DEE3D56F1','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');

        $itembase = new \iAdmin\Coach\itembase();
        $itembase->getStore()->getModel()->set('itembasetype','E');
        $itembase->update();

        $id = $itembase->getStore()->getModel()->getId();
        $model->setId($id);

        if(strlen($id) == 0) {
            throw new \PDOException('Não foi possível inserir o registro!');
        }
    }

    /**
     * @param \iAdmin\Model\equipment $model
     */
    public function posInsert( \iAdmin\Model\equipment &$model ) {

    }

    /**
     * @param \iAdmin\Model\equipment $model
     */
    public function preUpdate( \iAdmin\Model\equipment &$model ) {
        Session::hasProfile('3AF27DA7-29F2-4097-A8A4-F60DEE3D56F1','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');

        $itembase = new \iAdmin\Coach\itembase();
        $itembase->update();
    }

    /**
     * @param \iAdmin\Model\equipment $model
     */
    public function posUpdate( \iAdmin\Model\equipment &$model ) {

    }

    /**
     * @param \iAdmin\Model\equipment $model
     */
    public function preDelete( \iAdmin\Model\equipment &$model ) {
        Session::hasProfile('3AF27DA7-29F2-4097-A8A4-F60DEE3D56F1','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\equipment $model
     */
    public function posDelete( \iAdmin\Model\equipment &$model ) {

    }

}