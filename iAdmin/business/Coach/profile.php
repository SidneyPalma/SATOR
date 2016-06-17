<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class profile extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\profile $model
     */
    public $model = '\iAdmin\Model\profile';

    public function select() {
        try {
            Session::hasProfile('EE5C0377-A570-49D7-9C75-FCF3A92B3C83','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}