<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class modulemenu extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\modulemenu $model
     */
    public function preInsert( \iAdmin\Model\modulemenu &$model ) {
		Session::hasProfile('CD2A97FF-F6B1-4D72-8353-ACE9BAD5E648','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');
    }

    /**
     * @param \iAdmin\Model\modulemenu $model
     */
    public function posInsert( \iAdmin\Model\modulemenu &$model ) {

    }

    /**
     * @param \iAdmin\Model\modulemenu $model
     */
    public function preUpdate( \iAdmin\Model\modulemenu &$model ) {
		Session::hasProfile('CD2A97FF-F6B1-4D72-8353-ACE9BAD5E648','CD2A97FF-F6B1-4D72-8353-ACE9BAD5E648');
    }

    /**
     * @param \iAdmin\Model\modulemenu $model
     */
    public function posUpdate( \iAdmin\Model\modulemenu &$model ) {

    }

    /**
     * @param \iAdmin\Model\modulemenu $model
     */
    public function preDelete( \iAdmin\Model\modulemenu &$model ) {
		Session::hasProfile('CD2A97FF-F6B1-4D72-8353-ACE9BAD5E648','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\modulemenu $model
     */
    public function posDelete( \iAdmin\Model\modulemenu &$model ) {

    }

}