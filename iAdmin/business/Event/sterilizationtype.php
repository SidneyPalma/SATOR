<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class sterilizationtype extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\sterilizationtype $model
     */
    public function preInsert( \iAdmin\Model\sterilizationtype &$model ) {
		Session::hasProfile('6C3C7DCD-D33A-4434-81D9-767287F88344','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');
        
        $data = array();
        $sterilizationtype = new \iAdmin\Coach\sterilizationtype();
        $coreflow = $sterilizationtype->getStore()->getCache()->selectRules($data);
        $model->set('dataflowrule',$coreflow);
    }

    /**
     * @param \iAdmin\Model\sterilizationtype $model
     */
    public function posInsert( \iAdmin\Model\sterilizationtype &$model ) {

    }

    /**
     * @param \iAdmin\Model\sterilizationtype $model
     */
    public function preUpdate( \iAdmin\Model\sterilizationtype &$model ) {
		Session::hasProfile('6C3C7DCD-D33A-4434-81D9-767287F88344','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
    }

    /**
     * @param \iAdmin\Model\sterilizationtype $model
     */
    public function posUpdate( \iAdmin\Model\sterilizationtype &$model ) {

    }

    /**
     * @param \iAdmin\Model\sterilizationtype $model
     */
    public function preDelete( \iAdmin\Model\sterilizationtype &$model ) {
		Session::hasProfile('6C3C7DCD-D33A-4434-81D9-767287F88344','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\sterilizationtype $model
     */
    public function posDelete( \iAdmin\Model\sterilizationtype &$model ) {

    }

}