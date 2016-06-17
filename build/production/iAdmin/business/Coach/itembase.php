<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class itembase extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\itembase $model
     */
    public $model = '\iAdmin\Model\itembase';

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