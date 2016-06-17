<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class proprietary extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\proprietary $model
     */
    public $model = '\iAdmin\Model\proprietary';

    public function select() {
        try {
            Session::hasProfile('78EFE8BE-4AAD-4C46-8810-2D678F398273','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}