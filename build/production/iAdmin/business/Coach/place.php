<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class place extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\place $model
     */
    public $model = '\iAdmin\Model\place';

    public function select() {
        try {
            Session::hasProfile('ED924E20-BD9C-4210-ADA6-000D3D449217','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}