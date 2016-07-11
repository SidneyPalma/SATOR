<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class cmeareas extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\cmeareas $model
     */
    public $model = '\iAdmin\Model\cmeareas';

    public function select() {
        try {
            Session::hasProfile('907BDF5C-F83C-47A5-84C1-5D7D2385D081','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}