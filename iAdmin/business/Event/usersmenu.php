<?php

namespace iAdmin\Event;

class usersmenu extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\usersmenu $model
     */
    public function preInsert( \iAdmin\Model\usersmenu &$model ) {

    }

    /**
     * @param \iAdmin\Model\usersmenu $model
     */
    public function posInsert( \iAdmin\Model\usersmenu &$model ) {

    }

    /**
     * @param \iAdmin\Model\usersmenu $model
     */
    public function preUpdate( \iAdmin\Model\usersmenu &$model ) {

    }

    /**
     * @param \iAdmin\Model\usersmenu $model
     */
    public function posUpdate( \iAdmin\Model\usersmenu &$model ) {

    }

    /**
     * @param \iAdmin\Model\usersmenu $model
     */
    public function preDelete( \iAdmin\Model\usersmenu &$model ) {
        /**
         * Remove Permissões de ações de menu antes de remover o acesso ao menu
         */
        $id = $model->getId();

        $this->getProxy()->exec("delete from usersmenuaction where usersmenuid = $id");
    }

    /**
     * @param \iAdmin\Model\usersmenu $model
     */
    public function posDelete( \iAdmin\Model\usersmenu &$model ) {

    }

}