<?php

namespace iAdmin\Event;

class profilemenu extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\profilemenu $model
     */
    public function preInsert( \iAdmin\Model\profilemenu &$model ) {

    }

    /**
     * @param \iAdmin\Model\profilemenu $model
     */
    public function posInsert( \iAdmin\Model\profilemenu &$model ) {

    }

    /**
     * @param \iAdmin\Model\profilemenu $model
     */
    public function preUpdate( \iAdmin\Model\profilemenu &$model ) {

    }

    /**
     * @param \iAdmin\Model\profilemenu $model
     */
    public function posUpdate( \iAdmin\Model\profilemenu &$model ) {

    }

    /**
     * @param \iAdmin\Model\profilemenu $model
     */
    public function preDelete( \iAdmin\Model\profilemenu &$model ) {
        /**
         * Remove Permissões de ações de menu antes de remover o acesso ao menu
         */
        $id = $model->getId();
        $this->getProxy()->exec("delete from profilemenuaction where profilemenuid = $id");
    }

    /**
     * @param \iAdmin\Model\profilemenu $model
     */
    public function posDelete( \iAdmin\Model\profilemenu &$model ) {

    }

}