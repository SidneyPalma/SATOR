<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class materialstatus extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\materialstatus $model
     */
    public function preInsert( \iAdmin\Model\materialstatus &$model ) {
		Session::hasProfile('C5EE2EFA-AF88-4E37-85C5-BEC41D2DE517','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');
    }

    /**
     * @param \iAdmin\Model\materialstatus $model
     */
    public function posInsert( \iAdmin\Model\materialstatus &$model ) {

    }

    /**
     * @param \iAdmin\Model\materialstatus $model
     */
    public function preUpdate( \iAdmin\Model\materialstatus &$model ) {
		Session::hasProfile('C5EE2EFA-AF88-4E37-85C5-BEC41D2DE517','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
    }

    /**
     * @param \iAdmin\Model\materialstatus $model
     */
    public function posUpdate( \iAdmin\Model\materialstatus &$model ) {

    }

    /**
     * @param \iAdmin\Model\materialstatus $model
     */
    public function preDelete( \iAdmin\Model\materialstatus &$model ) {
		Session::hasProfile('C5EE2EFA-AF88-4E37-85C5-BEC41D2DE517','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\materialstatus $model
     */
    public function posDelete( \iAdmin\Model\materialstatus &$model ) {

    }

}