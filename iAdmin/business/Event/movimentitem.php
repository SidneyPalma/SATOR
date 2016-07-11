<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class movimentitem extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\movimentitem $model
     */
    public function preInsert( \iAdmin\Model\movimentitem &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\movimentitem $model
     */
    public function posInsert( \iAdmin\Model\movimentitem &$model ) {

    }

    /**
     * @param \iAdmin\Model\movimentitem $model
     */
    public function preUpdate( \iAdmin\Model\movimentitem &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\movimentitem $model
     */
    public function posUpdate( \iAdmin\Model\movimentitem &$model ) {
    }

    /**
     * @param \iAdmin\Model\movimentitem $model
     */
    public function preDelete( \iAdmin\Model\movimentitem &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\movimentitem $model
     */
    public function posDelete( \iAdmin\Model\movimentitem &$model ) {

    }

}