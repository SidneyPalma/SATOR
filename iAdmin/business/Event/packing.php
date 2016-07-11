<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class packing extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\packing $model
     */
    public function preInsert( \iAdmin\Model\packing &$model ) {
        Session::hasProfile('82FFABC6-23AC-472B-8B25-932E2990DE16','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');
    }

    /**
     * @param \iAdmin\Model\packing $model
     */
    public function posInsert( \iAdmin\Model\packing &$model ) {

    }

    /**
     * @param \iAdmin\Model\packing $model
     */
    public function preUpdate( \iAdmin\Model\packing &$model ) {
        Session::hasProfile('82FFABC6-23AC-472B-8B25-932E2990DE16','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
    }

    /**
     * @param \iAdmin\Model\packing $model
     */
    public function posUpdate( \iAdmin\Model\packing &$model ) {

    }

    /**
     * @param \iAdmin\Model\packing $model
     */
    public function preDelete( \iAdmin\Model\packing &$model ) {
        Session::hasProfile('82FFABC6-23AC-472B-8B25-932E2990DE16','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\packing $model
     */
    public function posDelete( \iAdmin\Model\packing &$model ) {

    }

}