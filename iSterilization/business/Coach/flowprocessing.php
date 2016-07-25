<?php

namespace iSterilization\Coach;

use Smart\Utils\Session;

class flowprocessing extends \Smart\Setup\Setup {

    /**
     * @var \iSterilization\Model\flowprocessing $model
     */
    public $model = '\iSterilization\Model\flowprocessing';

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