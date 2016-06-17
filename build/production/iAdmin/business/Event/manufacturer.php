<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class manufacturer extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\manufacturer $model
     */
    public function preInsert( \iAdmin\Model\manufacturer &$model ) {
        Session::hasProfile('B0D0A8F3-25F9-4CC3-985D-B7CCAEFA84EE','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');
    }

    /**
     * @param \iAdmin\Model\manufacturer $model
     */
    public function posInsert( \iAdmin\Model\manufacturer &$model ) {

    }

    /**
     * @param \iAdmin\Model\manufacturer $model
     */
    public function preUpdate( \iAdmin\Model\manufacturer &$model ) {
        Session::hasProfile('B0D0A8F3-25F9-4CC3-985D-B7CCAEFA84EE','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
    }

    /**
     * @param \iAdmin\Model\manufacturer $model
     */
    public function posUpdate( \iAdmin\Model\manufacturer &$model ) {

    }

    /**
     * @param \iAdmin\Model\manufacturer $model
     */
    public function preDelete( \iAdmin\Model\manufacturer &$model ) {
        Session::hasProfile('B0D0A8F3-25F9-4CC3-985D-B7CCAEFA84EE','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\manufacturer $model
     */
    public function posDelete( \iAdmin\Model\manufacturer &$model ) {

    }

}