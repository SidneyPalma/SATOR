<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class flowing extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\packing $model
     */
    public $model = '\iAdmin\Model\flowing';

    public function select() {
        try {
            Session::hasProfile('B12BFEEE-21FB-4EAB-92E2-ABFA69A6E826','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}