<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class inputpresentation extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\inputpresentation $model
     */
    public function preInsert( \iAdmin\Model\inputpresentation &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\inputpresentation $model
     */
    public function posInsert( \iAdmin\Model\inputpresentation &$model ) {

    }

    /**
     * @param \iAdmin\Model\inputpresentation $model
     */
    public function preUpdate( \iAdmin\Model\inputpresentation &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\inputpresentation $model
     */
    public function posUpdate( \iAdmin\Model\inputpresentation &$model ) {
    }

    /**
     * @param \iAdmin\Model\inputpresentation $model
     */
    public function preDelete( \iAdmin\Model\inputpresentation &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\inputpresentation $model
     */
    public function posDelete( \iAdmin\Model\inputpresentation &$model ) {

    }

}