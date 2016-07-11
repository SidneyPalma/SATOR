<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class collaborator extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\collaborator $model
     */
    public function preInsert( \iAdmin\Model\collaborator &$model ) {
        Session::hasProfile('B54B8F5F-5A2A-4AA9-B4CA-C0E6D4D72C4B','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');
    }

    /**
     * @param \iAdmin\Model\collaborator $model
     */
    public function posInsert( \iAdmin\Model\collaborator &$model ) {

    }

    /**
     * @param \iAdmin\Model\collaborator $model
     */
    public function preUpdate( \iAdmin\Model\collaborator &$model ) {
        Session::hasProfile('B54B8F5F-5A2A-4AA9-B4CA-C0E6D4D72C4B','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
    }

    /**
     * @param \iAdmin\Model\collaborator $model
     */
    public function posUpdate( \iAdmin\Model\collaborator &$model ) {

    }

    /**
     * @param \iAdmin\Model\collaborator $model
     */
    public function preDelete( \iAdmin\Model\collaborator &$model ) {
        Session::hasProfile('B54B8F5F-5A2A-4AA9-B4CA-C0E6D4D72C4B','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\collaborator $model
     */
    public function posDelete( \iAdmin\Model\collaborator &$model ) {

    }

}