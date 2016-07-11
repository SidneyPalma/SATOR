<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class proprietary extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\proprietary $model
     */
    public function preInsert( \iAdmin\Model\proprietary &$model ) {
        Session::hasProfile('78EFE8BE-4AAD-4C46-8810-2D678F398273','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');
    }

    /**
     * @param \iAdmin\Model\proprietary $model
     */
    public function posInsert( \iAdmin\Model\proprietary &$model ) {

    }

    /**
     * @param \iAdmin\Model\proprietary $model
     */
    public function preUpdate( \iAdmin\Model\proprietary &$model ) {
        Session::hasProfile('78EFE8BE-4AAD-4C46-8810-2D678F398273','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
    }

    /**
     * @param \iAdmin\Model\proprietary $model
     */
    public function posUpdate( \iAdmin\Model\proprietary &$model ) {
    }

    /**
     * @param \iAdmin\Model\proprietary $model
     */
    public function preDelete( \iAdmin\Model\proprietary &$model ) {
        Session::hasProfile('78EFE8BE-4AAD-4C46-8810-2D678F398273','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\proprietary $model
     */
    public function posDelete( \iAdmin\Model\proprietary &$model ) {

    }

}