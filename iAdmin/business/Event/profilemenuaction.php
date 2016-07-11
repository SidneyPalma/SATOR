<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class profilemenuaction extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\profilemenuaction $model
     */
    public function preInsert( \iAdmin\Model\profilemenuaction &$model ) {

        Session::hasProfile('EE5C0377-A570-49D7-9C75-FCF3A92B3C83','137C80DE-F072-4471-B28B-4B37DA91519F');

        $profilemenuid = $model->getProfilemenuid();

        if(strlen($profilemenuid) == 0) {
            $profilemenu = new \iAdmin\Coach\profilemenu();
            $profilemenu->update();
            $id = $profilemenu->getStore()->getModel()->getId();

            $model->setProfilemenuid($id);

            if(strlen($id) == 0) {
                throw new \PDOException('Não foi possível inserir o registro!');
            }
        }
    }

    /**
     * @param \iAdmin\Model\profilemenuaction $model
     */
    public function posInsert( \iAdmin\Model\profilemenuaction &$model ) {

    }

    /**
     * @param \iAdmin\Model\profilemenuaction $model
     */
    public function preUpdate( \iAdmin\Model\profilemenuaction &$model ) {
        Session::hasProfile('EE5C0377-A570-49D7-9C75-FCF3A92B3C83','5A31B807-9950-4F80-9C64-4BABDA118331');
    }

    /**
     * @param \iAdmin\Model\profilemenuaction $model
     */
    public function posUpdate( \iAdmin\Model\profilemenuaction &$model ) {

    }

    /**
     * @param \iAdmin\Model\profilemenuaction $model
     */
    public function preDelete( \iAdmin\Model\profilemenuaction &$model ) {
        Session::hasProfile('EE5C0377-A570-49D7-9C75-FCF3A92B3C83','61B9D007-AF80-42EC-A52F-CB87B1474E22');
    }

    /**
     * @param \iAdmin\Model\profilemenuaction $model
     */
    public function posDelete( \iAdmin\Model\profilemenuaction &$model ) {

    }

}