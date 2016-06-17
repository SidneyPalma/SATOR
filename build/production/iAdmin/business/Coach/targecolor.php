<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class targecolor extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\targecolor $model
     */
    public $model = '\iAdmin\Model\targecolor';

    public function select() {
        try {
            Session::hasProfile('1E16DE83-4A4D-4233-9FDD-34C9FDDF9C77','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}