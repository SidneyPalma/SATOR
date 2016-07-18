<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class equipmentcycle extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\equipmentcycle $model
     */
    public $model = '\iAdmin\Model\equipmentcycle';

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