<?php

namespace iSterilization\Coach;

use Smart\Utils\Session;

class flowprocessingstep extends \Smart\Setup\Setup {

    /**
     * @var \iSterilization\Model\flowprocessingstep $model
     */
    public $model = '\iSterilization\Model\flowprocessingstep';

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