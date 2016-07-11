<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class targecolor extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\targecolor $model
     */
    public function preInsert( \iAdmin\Model\targecolor &$model ) {
        Session::hasProfile('1E16DE83-4A4D-4233-9FDD-34C9FDDF9C77','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');
    }

    /**
     * @param \iAdmin\Model\targecolor $model
     */
    public function posInsert( \iAdmin\Model\targecolor &$model ) {

    }

    /**
     * @param \iAdmin\Model\targecolor $model
     */
    public function preUpdate( \iAdmin\Model\targecolor &$model ) {
        Session::hasProfile('1E16DE83-4A4D-4233-9FDD-34C9FDDF9C77','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
    }

    /**
     * @param \iAdmin\Model\targecolor $model
     */
    public function posUpdate( \iAdmin\Model\targecolor &$model ) {
    }

    /**
     * @param \iAdmin\Model\targecolor $model
     */
    public function preDelete( \iAdmin\Model\targecolor &$model ) {
        Session::hasProfile('1E16DE83-4A4D-4233-9FDD-34C9FDDF9C77','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\targecolor $model
     */
    public function posDelete( \iAdmin\Model\targecolor &$model ) {

    }

}