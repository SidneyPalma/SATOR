<?php

namespace iSterilization\Coach;

use Smart\Utils\Session;

class flowprocessingcharge extends \Smart\Setup\Setup {

    /**
     * @var \iSterilization\Model\flowprocessingcharge $model
     */
    public $model = '\iSterilization\Model\flowprocessingcharge';

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