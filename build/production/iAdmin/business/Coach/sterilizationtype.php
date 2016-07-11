<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class sterilizationtype extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\sterilizationtype $model
     */
    public $model = '\iAdmin\Model\sterilizationtype';

	    public function select() {
        try {
            Session::hasProfile('6C3C7DCD-D33A-4434-81D9-767287F88344','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}