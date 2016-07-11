<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class sterilizationtypeinput extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\sterilizationtypeinput $model
     */
    public $model = '\iAdmin\Model\sterilizationtypeinput';

    public function select() {
        try {
            Session::hasProfile('','');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}