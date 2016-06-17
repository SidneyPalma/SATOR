<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class material extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\material $model
     */
    public $model = '\iAdmin\Model\material';

    public function select() {
        try {
            Session::hasProfile('A9A88C89-D78F-44E4-9A21-1D92F0B5B484','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}