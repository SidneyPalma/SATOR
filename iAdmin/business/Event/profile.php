<?php

namespace iAdmin\Event;


use Smart\Utils\Session;

class profile extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\profile $model
     */
    public function preInsert( \iAdmin\Model\profile &$model ) {
        Session::hasProfile('EE5C0377-A570-49D7-9C75-FCF3A92B3C83','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');
    }

    /**
     * @param \iAdmin\Model\profile $model
     */
    public function posInsert( \iAdmin\Model\profile &$model ) {

    }

    /**
     * @param \iAdmin\Model\profile $model
     */
    public function preUpdate( \iAdmin\Model\profile &$model ) {
        Session::hasProfile('EE5C0377-A570-49D7-9C75-FCF3A92B3C83','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
    }

    /**
     * @param \iAdmin\Model\profile $model
     */
    public function posUpdate( \iAdmin\Model\profile &$model ) {

    }

    /**
     * @param \iAdmin\Model\profile $model
     */
    public function preDelete( \iAdmin\Model\profile &$model ) {
        Session::hasProfile('EE5C0377-A570-49D7-9C75-FCF3A92B3C83','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\profile $model
     */
    public function posDelete( \iAdmin\Model\profile &$model ) {

    }

}