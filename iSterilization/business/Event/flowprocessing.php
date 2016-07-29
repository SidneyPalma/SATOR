<?php

namespace iSterilization\Event;

use Smart\Utils\Session;

class flowprocessing extends \Smart\Data\Event {

    /**
     * @param \iSterilization\Model\flowprocessing $model
     */
    public function preInsert( \iSterilization\Model\flowprocessing &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessing $model
     */
    public function posInsert( \iSterilization\Model\flowprocessing &$model ) {
        $this->setFlowStep($model);
    }

    public function setFlowStep($model) {
        $id = $model->getId();
        $sterilizationtypeid = $model->getSterilizationtypeid();

//      "flowprocessingid" -->
//      "steplevel":2,
//      "elementtype":"basic.SubArea",
//      "elementname":"Recepção CME",
//      "stepflaglist":"[]",
//      "stepsettings" -->
//      "steppriority":0,
//      "source":1,
//      "target":3,
//      "areasid":"4",
//      "equipmentid":null


        try {

            $pdo = $this->getProxy()->prepare("select dataflowstep from sterilizationtype where id = :sterilizationtypeid");
            $pdo->bindValue(":sterilizationtypeid", $sterilizationtypeid, \PDO::PARAM_INT);

            $pdo->execute();
            $rows = $pdo->fetchAll();
            $data = $rows[0];

            $inserted = array();
            $flowstep = self::jsonToObject($data['dataflowstep']);

            $fields = [
                'flowprocessingid','steplevel','elementtype',
                'elementname','stepflaglist','stepsettings',
                'steppriority','source','target',
                'areasid','equipmentid'
            ];

            foreach ($flowstep as $step) {
                $sqlstep = "insert into flowprocessingstep "  . trim(implode(', ', $fields)) . " values ( %d, %s, %s, %s, %s, %s, %s, %s, %s, %d, %s )";
                $inserted[] = sprintf($sqlstep,$id);
            }


        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    /**
     * @param \iSterilization\Model\flowprocessing $model
     */
    public function preUpdate( \iSterilization\Model\flowprocessing &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessing $model
     */
    public function posUpdate( \iSterilization\Model\flowprocessing &$model ) {
    }

    /**
     * @param \iSterilization\Model\flowprocessing $model
     */
    public function preDelete( \iSterilization\Model\flowprocessing &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessing $model
     */
    public function posDelete( \iSterilization\Model\flowprocessing &$model ) {

    }

}