<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class classcouncil extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\classcouncil $model
     */
    public $model = '\iAdmin\Model\classcouncil';

    public function select() {
        try {
            Session::hasProfile('D2CDAAA6-78C9-42A6-9D17-804F9C601537','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}