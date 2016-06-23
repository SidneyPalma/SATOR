<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class materialboxtarge extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\materialboxtarge $model
     */
    public function preInsert( \iAdmin\Model\materialboxtarge &$model ) {
        Session::hasProfile('6DFB6B9C-7013-4F18-A905-FBB6A5AE25D7','74AE05EE-E510-4F49-9723-E705C06DD2F5');
    }

    /**
     * @param \iAdmin\Model\materialboxtarge $model
     */
    public function posInsert( \iAdmin\Model\materialboxtarge &$model ) {

    }

    /**
     * @param \iAdmin\Model\materialboxtarge $model
     */
    public function preUpdate( \iAdmin\Model\materialboxtarge &$model ) {
        Session::hasProfile('6DFB6B9C-7013-4F18-A905-FBB6A5AE25D7','156557F3-C5AC-41F6-985A-EE3EF7A81C37');
    }

    /**
     * @param \iAdmin\Model\materialboxtarge $model
     */
    public function posUpdate( \iAdmin\Model\materialboxtarge &$model ) {
    }

    /**
     * @param \iAdmin\Model\materialboxtarge $model
     */
    public function preDelete( \iAdmin\Model\materialboxtarge &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\materialboxtarge $model
     */
    public function posDelete( \iAdmin\Model\materialboxtarge &$model ) {

    }

}