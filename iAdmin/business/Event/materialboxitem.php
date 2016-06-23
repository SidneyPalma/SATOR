<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class materialboxitem extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\materialboxitem $model
     */
    public function preInsert( \iAdmin\Model\materialboxitem &$model ) {
        Session::hasProfile('6DFB6B9C-7013-4F18-A905-FBB6A5AE25D7','C6348B3C-06D5-4C10-9264-4B0EC582E8D5');
    }

    /**
     * @param \iAdmin\Model\materialboxitem $model
     */
    public function posInsert( \iAdmin\Model\materialboxitem &$model ) {

    }

    /**
     * @param \iAdmin\Model\materialboxitem $model
     */
    public function preUpdate( \iAdmin\Model\materialboxitem &$model ) {
        Session::hasProfile('6DFB6B9C-7013-4F18-A905-FBB6A5AE25D7','0E6B5DF9-66C0-4801-B7A8-704290FEAFDC');
    }

    /**
     * @param \iAdmin\Model\materialboxitem $model
     */
    public function posUpdate( \iAdmin\Model\materialboxitem &$model ) {
    }

    /**
     * @param \iAdmin\Model\materialboxitem $model
     */
    public function preDelete( \iAdmin\Model\materialboxitem &$model ) {
        Session::hasProfile('6DFB6B9C-7013-4F18-A905-FBB6A5AE25D7','6E285F8A-DB3D-4CE0-8ACC-E8B86C9735F3');
    }

    /**
     * @param \iAdmin\Model\materialboxitem $model
     */
    public function posDelete( \iAdmin\Model\materialboxitem &$model ) {

    }

}