<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class provider extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\packing $model
     */
    public $model = '\iAdmin\Model\provider';

    public function select() {
        try {
            Session::hasProfile('D7C70C5A-472F-42DA-B18F-E2404AF8B552','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}