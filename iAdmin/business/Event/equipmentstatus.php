<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class equipmentstatus extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\equipmentstatus $model
     */
    public function preInsert( \iAdmin\Model\equipmentstatus &$model ) {
        Session::hasProfile('8DDC6B07-514F-4B26-9EDC-E0483B82804C','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');
    }

    /**
     * @param \iAdmin\Model\equipmentstatus $model
     */
    public function posInsert( \iAdmin\Model\equipmentstatus &$model ) {

    }

    /**
     * @param \iAdmin\Model\equipmentstatus $model
     */
    public function preUpdate( \iAdmin\Model\equipmentstatus &$model ) {
        Session::hasProfile('8DDC6B07-514F-4B26-9EDC-E0483B82804C','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
    }

    /**
     * @param \iAdmin\Model\equipmentstatus $model
     */
    public function posUpdate( \iAdmin\Model\equipmentstatus &$model ) {
    }

    /**
     * @param \iAdmin\Model\equipmentstatus $model
     */
    public function preDelete( \iAdmin\Model\equipmentstatus &$model ) {
        Session::hasProfile('8DDC6B07-514F-4B26-9EDC-E0483B82804C','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\equipmentstatus $model
     */
    public function posDelete( \iAdmin\Model\equipmentstatus &$model ) {

    }

}