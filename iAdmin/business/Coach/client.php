<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class client extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\client $model
     */
    public $model = '\iAdmin\Model\client';

    public function select() {
        try {
            Session::hasProfile('43A12931-1E88-44F1-B219-4F815C704604','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }	
}