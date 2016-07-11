<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class enumtypelist extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\enumtypelist $model
     */
    public function preInsert( \iAdmin\Model\enumtypelist &$model ) {
        Session::hasProfile('42FE05D5-F995-4078-BE34-10EA7C9DA95A','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');
    }

    /**
     * @param \iAdmin\Model\enumtypelist $model
     */
    public function posInsert( \iAdmin\Model\enumtypelist &$model ) {

    }

    /**
     * @param \iAdmin\Model\enumtypelist $model
     */
    public function preUpdate( \iAdmin\Model\enumtypelist &$model ) {
        Session::hasProfile('42FE05D5-F995-4078-BE34-10EA7C9DA95A','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
    }

    /**
     * @param \iAdmin\Model\enumtypelist $model
     */
    public function posUpdate( \iAdmin\Model\enumtypelist &$model ) {

    }

    /**
     * @param \iAdmin\Model\enumtypelist $model
     */
    public function preDelete( \iAdmin\Model\enumtypelist &$model ) {
        Session::hasProfile('42FE05D5-F995-4078-BE34-10EA7C9DA95A','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\enumtypelist $model
     */
    public function posDelete( \iAdmin\Model\enumtypelist &$model ) {

    }

}