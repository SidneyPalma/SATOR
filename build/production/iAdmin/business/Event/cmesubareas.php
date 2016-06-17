<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class cmesubareas extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\cmesubareas $model
     */
    public function preInsert( \iAdmin\Model\cmesubareas &$model ) {
        Session::hasProfile('AEDD46A9-6F1D-41C5-9BD9-566561E3B07B','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');

        $areas = new \iAdmin\Coach\areas();
        $areas->getStore()->getModel()->set('areastype','C');
        $areas->update();

        $id = $areas->getStore()->getModel()->getId();
        $model->setId($id);

        if(strlen($id) == 0) {
            throw new \PDOException('Não foi possível inserir o registro!');
        }
    }

    /**
     * @param \iAdmin\Model\cmesubareas $model
     */
    public function posInsert( \iAdmin\Model\cmesubareas &$model ) {

    }

    /**
     * @param \iAdmin\Model\cmesubareas $model
     */
    public function preUpdate( \iAdmin\Model\cmesubareas &$model ) {
        Session::hasProfile('AEDD46A9-6F1D-41C5-9BD9-566561E3B07B','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');

        $areas = new \iAdmin\Coach\areas();
        $areas->update();
    }

    /**
     * @param \iAdmin\Model\cmesubareas $model
     */
    public function posUpdate( \iAdmin\Model\cmesubareas &$model ) {
    }

    /**
     * @param \iAdmin\Model\cmesubareas $model
     */
    public function preDelete( \iAdmin\Model\cmesubareas &$model ) {
        Session::hasProfile('AEDD46A9-6F1D-41C5-9BD9-566561E3B07B','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\cmesubareas $model
     */
    public function posDelete( \iAdmin\Model\cmesubareas &$model ) {

    }

}