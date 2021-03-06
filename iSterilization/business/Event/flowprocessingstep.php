<?php

namespace iSterilization\Event;

use Smart\Utils\Session;

class flowprocessingstep extends \Smart\Data\Event {

    /**
     * @param \iSterilization\Model\flowprocessingstep $model
     */
    public function preInsert( \iSterilization\Model\flowprocessingstep &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessingstep $model
     */
    public function posInsert( \iSterilization\Model\flowprocessingstep &$model ) {

    }

    /**
     * @param \iSterilization\Model\flowprocessingstep $model
     */
    public function preUpdate( \iSterilization\Model\flowprocessingstep &$model ) {
        Session::hasProfile('','');

        $cyclestart = $model->getCyclestart();
        $cyclefinal = $model->getCyclefinal();

        if($cyclestart == 'START') {
            $datestart = date("Ymd H:i:s");
            $model->set('cyclestart',$datestart);
        }

        if($cyclefinal == 'FINAL') {
            $datefinal = date("Ymd H:i:s");
            $model->set('cyclefinal',$datefinal);
        }
    }

    /**
     * @param \iSterilization\Model\flowprocessingstep $model
     */
    public function posUpdate( \iSterilization\Model\flowprocessingstep &$model ) {
    }

    /**
     * @param \iSterilization\Model\flowprocessingstep $model
     */
    public function preDelete( \iSterilization\Model\flowprocessingstep &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessingstep $model
     */
    public function posDelete( \iSterilization\Model\flowprocessingstep &$model ) {

    }

}