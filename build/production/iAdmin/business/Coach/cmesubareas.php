<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class cmesubareas extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\cmesubareas $model
     */
    public $model = '\iAdmin\Model\cmesubareas';

    public function select() {
        try {
            Session::hasProfile('AEDD46A9-6F1D-41C5-9BD9-566561E3B07B','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}