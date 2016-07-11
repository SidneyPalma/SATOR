<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class flowing extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\flowing $model
     */
    public function preInsert( \iAdmin\Model\flowing &$model ) {
        Session::hasProfile('B12BFEEE-21FB-4EAB-92E2-ABFA69A6E826','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');
    }

    /**
     * @param \iAdmin\Model\flowing $model
     */
    public function posInsert( \iAdmin\Model\flowing &$model ) {

    }

    /**
     * @param \iAdmin\Model\flowing $model
     */
    public function preUpdate( \iAdmin\Model\flowing &$model ) {
        Session::hasProfile('B12BFEEE-21FB-4EAB-92E2-ABFA69A6E826','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
    }

    /**
     * @param \iAdmin\Model\flowing $model
     */
    public function posUpdate( \iAdmin\Model\flowing &$model ) {

    }

    /**
     * @param \iAdmin\Model\flowing $model
     */
    public function preDelete( \iAdmin\Model\flowing &$model ) {
        Session::hasProfile('B12BFEEE-21FB-4EAB-92E2-ABFA69A6E826','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\flowing $model
     */
    public function posDelete( \iAdmin\Model\flowing &$model ) {

    }

}