<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class provider extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\provider $model
     */
    public function preInsert( \iAdmin\Model\provider &$model ) {
		Session::hasProfile('D7C70C5A-472F-42DA-B18F-E2404AF8B552','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');
    }

    /**
     * @param \iAdmin\Model\provider $model
     */
    public function posInsert( \iAdmin\Model\provider &$model ) {

    }

    /**
     * @param \iAdmin\Model\provider $model
     */
    public function preUpdate( \iAdmin\Model\provider &$model ) {
		Session::hasProfile('D7C70C5A-472F-42DA-B18F-E2404AF8B552','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
    }

    /**
     * @param \iAdmin\Model\provider $model
     */
    public function posUpdate( \iAdmin\Model\provider &$model ) {

    }

    /**
     * @param \iAdmin\Model\provider $model
     */
    public function preDelete( \iAdmin\Model\provider &$model ) {
		Session::hasProfile('D7C70C5A-472F-42DA-B18F-E2404AF8B552','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\provider $model
     */
    public function posDelete( \iAdmin\Model\provider &$model ) {

    }

}