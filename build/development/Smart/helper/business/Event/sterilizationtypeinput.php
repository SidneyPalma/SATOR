<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class sterilizationtypeinput extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\sterilizationtypeinput $model
     */
    public function preInsert( \iAdmin\Model\sterilizationtypeinput &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\sterilizationtypeinput $model
     */
    public function posInsert( \iAdmin\Model\sterilizationtypeinput &$model ) {

    }

    /**
     * @param \iAdmin\Model\sterilizationtypeinput $model
     */
    public function preUpdate( \iAdmin\Model\sterilizationtypeinput &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\sterilizationtypeinput $model
     */
    public function posUpdate( \iAdmin\Model\sterilizationtypeinput &$model ) {
    }

    /**
     * @param \iAdmin\Model\sterilizationtypeinput $model
     */
    public function preDelete( \iAdmin\Model\sterilizationtypeinput &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\sterilizationtypeinput $model
     */
    public function posDelete( \iAdmin\Model\sterilizationtypeinput &$model ) {

    }

}