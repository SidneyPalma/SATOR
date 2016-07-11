<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class modulemenu extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\modulemenu $model
     */
    public $model = '\iAdmin\Model\modulemenu';
	
    public function select() {
        try {
            Session::hasProfile('CD2A97FF-F6B1-4D72-8353-ACE9BAD5E648','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}