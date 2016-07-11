<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class materialtypeflow extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\materialtypeflow $model
     */
    public function preInsert( \iAdmin\Model\materialtypeflow &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\materialtypeflow $model
     */
    public function posInsert( \iAdmin\Model\materialtypeflow &$model ) {

    }

    /**
     * @param \iAdmin\Model\materialtypeflow $model
     */
    public function preUpdate( \iAdmin\Model\materialtypeflow &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\materialtypeflow $model
     */
    public function posUpdate( \iAdmin\Model\materialtypeflow &$model ) {
    }

    /**
     * @param \iAdmin\Model\materialtypeflow $model
     */
    public function preDelete( \iAdmin\Model\materialtypeflow &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\materialtypeflow $model
     */
    public function posDelete( \iAdmin\Model\materialtypeflow &$model ) {

    }

}