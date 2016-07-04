<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class unitmeasurement extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\unitmeasurement $model
     */
    public $model = '\iAdmin\Model\unitmeasurement';

    public function select() {
        try {
            Session::hasProfile('8ACCF18A-58BE-451A-A659-8A2ED08F1620','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}