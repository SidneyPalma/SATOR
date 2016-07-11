<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class classcouncil extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\classcouncil $model
     */
    public function preInsert( \iAdmin\Model\classcouncil &$model ) {
        Session::hasProfile('D2CDAAA6-78C9-42A6-9D17-804F9C601537','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');
    }

    /**
     * @param \iAdmin\Model\classcouncil $model
     */
    public function posInsert( \iAdmin\Model\classcouncil &$model ) {

    }

    /**
     * @param \iAdmin\Model\classcouncil $model
     */
    public function preUpdate( \iAdmin\Model\classcouncil &$model ) {
        Session::hasProfile('D2CDAAA6-78C9-42A6-9D17-804F9C601537','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
    }

    /**
     * @param \iAdmin\Model\classcouncil $model
     */
    public function posUpdate( \iAdmin\Model\classcouncil &$model ) {

    }

    /**
     * @param \iAdmin\Model\classcouncil $model
     */
    public function preDelete( \iAdmin\Model\classcouncil &$model ) {
        Session::hasProfile('D2CDAAA6-78C9-42A6-9D17-804F9C601537','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\classcouncil $model
     */
    public function posDelete( \iAdmin\Model\classcouncil &$model ) {

    }

}