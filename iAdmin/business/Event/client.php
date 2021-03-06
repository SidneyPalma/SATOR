<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class client extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\client $model
     */
    public function preInsert( \iAdmin\Model\client &$model ) {
		Session::hasProfile('43A12931-1E88-44F1-B219-4F815C704604','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');
    }

    /**
     * @param \iAdmin\Model\client $model
     */
    public function posInsert( \iAdmin\Model\client &$model ) {

    }

    /**
     * @param \iAdmin\Model\client $model
     */
    public function preUpdate( \iAdmin\Model\client &$model ) {
		Session::hasProfile('43A12931-1E88-44F1-B219-4F815C704604','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
    }

    /**
     * @param \iAdmin\Model\client $model
     */
    public function posUpdate( \iAdmin\Model\client &$model ) {

    }

    /**
     * @param \iAdmin\Model\client $model
     */
    public function preDelete( \iAdmin\Model\client &$model ) {
		Session::hasProfile('43A12931-1E88-44F1-B219-4F815C704604','43BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\client $model
     */
    public function posDelete( \iAdmin\Model\client &$model ) {

    }

}