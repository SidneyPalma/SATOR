<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class cmeareas extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\cmeareas $model
     */
    public function preInsert( \iAdmin\Model\cmeareas &$model ) {
		Session::hasProfile('907BDF5C-F83C-47A5-84C1-5D7D2385D081','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');

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
     * @param \iAdmin\Model\cmeareas $model
     */
    public function posInsert( \iAdmin\Model\cmeareas &$model ) {

    }

    /**
     * @param \iAdmin\Model\cmeareas $model
     */
    public function preUpdate( \iAdmin\Model\cmeareas &$model ) {
        Session::hasProfile('907BDF5C-F83C-47A5-84C1-5D7D2385D081','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
        $areas = new \iAdmin\Coach\areas();
        $areas->update();
    }

    /**
     * @param \iAdmin\Model\cmeareas $model
     */
    public function posUpdate( \iAdmin\Model\cmeareas &$model ) {		
		
    }

    /**
     * @param \iAdmin\Model\cmeareas $model
     */
    public function preDelete( \iAdmin\Model\cmeareas &$model ) {
        Session::hasProfile('907BDF5C-F83C-47A5-84C1-5D7D2385D081','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\cmeareas $model
     */
    public function posDelete( \iAdmin\Model\cmeareas &$model ) {

    }

}