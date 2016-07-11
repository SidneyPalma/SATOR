<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class entity extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\entity $model
     */
    public $model = '\iAdmin\Model\entity';

    public function select() {
        try {
            Session::hasProfile('6494BFA3-AD13-485E-BAC4-5B305228F5A0','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}