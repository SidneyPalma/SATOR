<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class equipmentstatus extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\equipmentstatus $model
     */
    public $model = '\iAdmin\Model\equipmentstatus';

    public function select() {
        try {
            Session::hasProfile('8DDC6B07-514F-4B26-9EDC-E0483B82804C','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}