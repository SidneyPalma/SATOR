<?php

namespace iAdmin\Coach;

use Smart\Utils\Session;

class users extends \Smart\Setup\Setup {

    /**
     * @var \iAdmin\Model\users $model
     */
    public $model = '\iAdmin\Model\users';

    public function select() {
        $method = $this->getStore()->getModel()->getSubmit()->getRawValue('method');
        $select = array('selectCode','selectLike','selectSame','selectDown','selectLoad');

        try {
            if(array_key_exists($method, $select)) {
                Session::hasProfile('27F003DB-A946-436D-8E25-2C5983E98B5A','15A56879-D893-4255-AE55-22F22C514060');
            }
            $result = parent::select();
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

}