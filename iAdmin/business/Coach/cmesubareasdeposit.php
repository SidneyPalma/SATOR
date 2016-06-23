<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class cmesubareasdeposit extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\cmesubareasdeposit $model
     */
    public $model = '\iAdmin\Model\cmesubareasdeposit';

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