<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class instrumentator extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\packing $model
     */
    public $model = '\iAdmin\Model\instrumentator';

    public function select() {
        try {
            Session::hasProfile('D0ED7D9B-DF32-4BE2-8BF1-12373E5502CD','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}