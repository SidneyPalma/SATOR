<?php

namespace iAdmin\Coach;


use Smart\Utils\Session;

class enumtype extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\enumtype $model
     */
    public $model = '\iAdmin\Model\enumtype';

    public function select() {
        try {
            Session::hasProfile('42FE05D5-F995-4078-BE34-10EA7C9DA95A','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}