<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class input extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\input $model
     */
    public $model = '\iAdmin\Model\input';

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