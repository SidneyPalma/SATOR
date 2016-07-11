<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class materialbox extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\materialbox $model
     */
    public function preInsert( \iAdmin\Model\materialbox &$model ) {
		Session::hasProfile('6DFB6B9C-7013-4F18-A905-FBB6A5AE25D7','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');

        $model->set('statusbox','000');
    }

    /**
     * @param \iAdmin\Model\materialbox $model
     */
    public function posInsert( \iAdmin\Model\materialbox &$model ) {

    }

    /**
     * @param \iAdmin\Model\materialbox $model
     */
    public function preUpdate( \iAdmin\Model\materialbox &$model ) {
		Session::hasProfile('6DFB6B9C-7013-4F18-A905-FBB6A5AE25D7','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
    }

    /**
     * @param \iAdmin\Model\materialbox $model
     */
    public function posUpdate( \iAdmin\Model\materialbox &$model ) {
    }

    /**
     * @param \iAdmin\Model\materialbox $model
     */
    public function preDelete( \iAdmin\Model\materialbox &$model ) {
		Session::hasProfile('6DFB6B9C-7013-4F18-A905-FBB6A5AE25D7','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\materialbox $model
     */
    public function posDelete( \iAdmin\Model\materialbox &$model ) {

    }

}