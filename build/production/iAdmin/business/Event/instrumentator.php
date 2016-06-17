<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class instrumentator extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\instrumentator $model
     */
    public function preInsert( \iAdmin\Model\instrumentator &$model ) {
        Session::hasProfile('D0ED7D9B-DF32-4BE2-8BF1-12373E5502CD','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');
    }

    /**
     * @param \iAdmin\Model\instrumentator $model
     */
    public function posInsert( \iAdmin\Model\instrumentator &$model ) {

    }

    /**
     * @param \iAdmin\Model\instrumentator $model
     */
    public function preUpdate( \iAdmin\Model\instrumentator &$model ) {
        Session::hasProfile('D0ED7D9B-DF32-4BE2-8BF1-12373E5502CD','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
    }

    /**
     * @param \iAdmin\Model\instrumentator $model
     */
    public function posUpdate( \iAdmin\Model\instrumentator &$model ) {

    }

    /**
     * @param \iAdmin\Model\instrumentator $model
     */
    public function preDelete( \iAdmin\Model\instrumentator &$model ) {
        Session::hasProfile('D0ED7D9B-DF32-4BE2-8BF1-12373E5502CD','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\instrumentator $model
     */
    public function posDelete( \iAdmin\Model\instrumentator &$model ) {

    }

}