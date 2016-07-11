<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class collaborator extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\collaborator $model
     */
    public $model = '\iAdmin\Model\collaborator';

    public function select() {
        try {
            Session::hasProfile('B54B8F5F-5A2A-4AA9-B4CA-C0E6D4D72C4B','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}