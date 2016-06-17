<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class equipment extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\equipment $model
     */
    public $model = '\iAdmin\Model\equipment';

    public function select() {
        try {
            Session::hasProfile('3AF27DA7-29F2-4097-A8A4-F60DEE3D56F1','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}