<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class place extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\place $model
     */
    public function preInsert( \iAdmin\Model\place &$model ) {
        Session::hasProfile('ED924E20-BD9C-4210-ADA6-000D3D449217','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');
    }

    /**
     * @param \iAdmin\Model\place $model
     */
    public function posInsert( \iAdmin\Model\place &$model ) {

    }

    /**
     * @param \iAdmin\Model\place $model
     */
    public function preUpdate( \iAdmin\Model\place &$model ) {
        Session::hasProfile('ED924E20-BD9C-4210-ADA6-000D3D449217','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
    }

    /**
     * @param \iAdmin\Model\place $model
     */
    public function posUpdate( \iAdmin\Model\place &$model ) {
    }

    /**
     * @param \iAdmin\Model\place $model
     */
    public function preDelete( \iAdmin\Model\place &$model ) {
        Session::hasProfile('ED924E20-BD9C-4210-ADA6-000D3D449217','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\place $model
     */
    public function posDelete( \iAdmin\Model\place &$model ) {

    }

}