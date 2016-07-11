<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class material extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\material $model
     */
    public function preInsert( \iAdmin\Model\material &$model ) {
        Session::hasProfile('A9A88C89-D78F-44E4-9A21-1D92F0B5B484','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');

        $itembase = new \iAdmin\Coach\itembase();
        $itembase->getStore()->getModel()->set('itembasetype','M');
        $itembase->update();

        $id = $itembase->getStore()->getModel()->getId();
        $model->setId($id);

        if(strlen($id) == 0) {
			throw new \PDOException('Nâo foi possível inserir o registro!');
        }
    }

    /**
     * @param \iAdmin\Model\material $model
     */
    public function posInsert( \iAdmin\Model\material &$model ) {

    }

    /**
     * @param \iAdmin\Model\material $model
     */
    public function preUpdate( \iAdmin\Model\material &$model ) {
        Session::hasProfile('A9A88C89-D78F-44E4-9A21-1D92F0B5B484','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');

        $itembase = new \iAdmin\Coach\itembase();
        $itembase->update();
    }

    /**
     * @param \iAdmin\Model\material $model
     */
    public function posUpdate( \iAdmin\Model\material &$model ) {

    }

    /**
     * @param \iAdmin\Model\material $model
     */
    public function preDelete( \iAdmin\Model\material &$model ) {
        Session::hasProfile('A9A88C89-D78F-44E4-9A21-1D92F0B5B484','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\material $model
     */
    public function posDelete( \iAdmin\Model\material &$model ) {

    }

}