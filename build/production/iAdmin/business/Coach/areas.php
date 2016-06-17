<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class areas extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\areas $model
     */
    public $model = '\iAdmin\Model\areas';

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