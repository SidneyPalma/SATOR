<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class materialbox extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\materialbox $model
     */
    public $model = '\iAdmin\Model\materialbox';

    public function select() {
        try {
			Session::hasProfile('6DFB6B9C-7013-4F18-A905-FBB6A5AE25D7','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}