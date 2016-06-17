<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class materialstatus extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\materialstatus $model
     */
    public $model = '\iAdmin\Model\materialstatus';

    public function select() {
        try {
            Session::hasProfile('C5EE2EFA-AF88-4E37-85C5-BEC41D2DE517','15A56879-D893-4255-AE55-22F22C514060');
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}