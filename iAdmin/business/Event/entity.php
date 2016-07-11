<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class entity extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\entity $model
     */
    public function preInsert( \iAdmin\Model\entity &$model ) {
        Session::hasProfile('6494BFA3-AD13-485E-BAC4-5B305228F5A0','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');
    }

    /**
     * @param \iAdmin\Model\entity $model
     */
    public function posInsert( \iAdmin\Model\entity &$model ) {

    }

    /**
     * @param \iAdmin\Model\entity $model
     */
    public function preUpdate( \iAdmin\Model\entity &$model ) {
        Session::hasProfile('6494BFA3-AD13-485E-BAC4-5B305228F5A0','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
    }

    /**
     * @param \iAdmin\Model\entity $model
     */
    public function posUpdate( \iAdmin\Model\entity &$model ) {

    }

    /**
     * @param \iAdmin\Model\entity $model
     */
    public function preDelete( \iAdmin\Model\entity &$model ) {
        Session::hasProfile('6494BFA3-AD13-485E-BAC4-5B305228F5A0','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\entity $model
     */
    public function posDelete( \iAdmin\Model\entity &$model ) {

    }

}