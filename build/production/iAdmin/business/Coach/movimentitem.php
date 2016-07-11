<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class movimentitem extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\movimentitem $model
     */
    public $model = '\iAdmin\Model\movimentitem';

    public function select() {
        try {
            Session::hasProfile('','');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}