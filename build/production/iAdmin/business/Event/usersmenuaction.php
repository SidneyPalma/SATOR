<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class usersmenuaction extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\usersmenuaction $model
     */
    public function preInsert( \iAdmin\Model\usersmenuaction &$model ) {

        Session::hasProfile('27F003DB-A946-436D-8E25-2C5983E98B5A','137C80DE-F072-4471-B28B-4B37DA91519F');

        $usersmenuid = $model->getUsersmenuid();

        if(strlen($usersmenuid) == 0) {
            $usersmenu = new \iAdmin\Coach\usersmenu();
            $usersmenu->update();
            $record = $usersmenu->getStore()->getModel()->getRecord();

            $model->setUsersmenuid($record['id']);

            if(strlen($record['id']) == 0) {
                throw new \PDOException('Não foi possível inserir o registro!');
            }
        }
    }

    /**
     * @param \iAdmin\Model\usersmenuaction $model
     */
    public function posInsert( \iAdmin\Model\usersmenuaction &$model ) {

    }

    /**
     * @param \iAdmin\Model\usersmenuaction $model
     */
    public function preUpdate( \iAdmin\Model\usersmenuaction &$model ) {
        Session::hasProfile('27F003DB-A946-436D-8E25-2C5983E98B5A','5A31B807-9950-4F80-9C64-4BABDA118331');
    }

    /**
     * @param \iAdmin\Model\usersmenuaction $model
     */
    public function posUpdate( \iAdmin\Model\usersmenuaction &$model ) {

    }

    /**
     * @param \iAdmin\Model\usersmenuaction $model
     */
    public function preDelete( \iAdmin\Model\usersmenuaction &$model ) {
        Session::hasProfile('27F003DB-A946-436D-8E25-2C5983E98B5A','61B9D007-AF80-42EC-A52F-CB87B1474E22');
    }

    /**
     * @param \iAdmin\Model\usersmenuaction $model
     */
    public function posDelete( \iAdmin\Model\usersmenuaction &$model ) {

    }

}