<?php

namespace iSterilization\Model;

/**
 * 
 * @Entity {"name":"flowprocessingstep", "logbook":true, "cache":"\\iSterilization\\Cache\\flowprocessingstep", "event":"\\iSterilization\\Event\\flowprocessingstep"}
 */
class flowprocessingstep extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $flowprocessingid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":"((0))"}
     */
    private $steppriority;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":"((0))"}
     */
    private $steplevel;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $source;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $target;

    /**
     * @Policy {"nullable":true, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $username;

    /**
     * @Policy {"nullable":false, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $elementtype;

    /**
     * @Policy {"nullable":true, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $elementname;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $stepflaglist;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $stepsettings;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $areasid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $equipmentid;

    /**
     * @Policy {"nullable":false, "length":3}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":"('000')"}
     */
    private $flowstepstatus;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $datestart;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $datefinal;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $cyclestart;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $cyclefinal;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $exceptionby;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $exceptiondo;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":""}
     */
    private $useppe;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":"((0))"}
     */
    private $flowchoice;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":"((0))"}
     */
    private $flowbreach;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getFlowprocessingid() {
        return $this->flowprocessingid;
    }

    /**
     * @param type $flowprocessingid
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setFlowprocessingid($flowprocessingid) {
        $this->flowprocessingid = $flowprocessingid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getSteppriority() {
        return $this->steppriority;
    }

    /**
     * @param type $steppriority
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setSteppriority($steppriority) {
        $this->steppriority = $steppriority;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getSteplevel() {
        return $this->steplevel;
    }

    /**
     * @param type $steplevel
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setSteplevel($steplevel) {
        $this->steplevel = $steplevel;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getSource() {
        return $this->source;
    }

    /**
     * @param type $source
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setSource($source) {
        $this->source = $source;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getTarget() {
        return $this->target;
    }

    /**
     * @param type $target
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setTarget($target) {
        $this->target = $target;
        return $this;
    }

    /**
     * @return type string
     */
    public function getUsername() {
        return $this->username;
    }

    /**
     * @param type $username
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setUsername($username) {
        $this->username = $username;
        return $this;
    }

    /**
     * @return type string
     */
    public function getElementtype() {
        return $this->elementtype;
    }

    /**
     * @param type $elementtype
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setElementtype($elementtype) {
        $this->elementtype = $elementtype;
        return $this;
    }

    /**
     * @return type string
     */
    public function getElementname() {
        return $this->elementname;
    }

    /**
     * @param type $elementname
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setElementname($elementname) {
        $this->elementname = $elementname;
        return $this;
    }

    /**
     * @return type string
     */
    public function getStepflaglist() {
        return $this->stepflaglist;
    }

    /**
     * @param type $stepflaglist
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setStepflaglist($stepflaglist) {
        $this->stepflaglist = $stepflaglist;
        return $this;
    }

    /**
     * @return type string
     */
    public function getStepsettings() {
        return $this->stepsettings;
    }

    /**
     * @param type $stepsettings
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setStepsettings($stepsettings) {
        $this->stepsettings = $stepsettings;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getAreasid() {
        return $this->areasid;
    }

    /**
     * @param type $areasid
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setAreasid($areasid) {
        $this->areasid = $areasid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getEquipmentid() {
        return $this->equipmentid;
    }

    /**
     * @param type $equipmentid
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setEquipmentid($equipmentid) {
        $this->equipmentid = $equipmentid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getFlowstepstatus() {
        return $this->flowstepstatus;
    }

    /**
     * @param type $flowstepstatus
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setFlowstepstatus($flowstepstatus) {
        $this->flowstepstatus = $flowstepstatus;
        return $this;
    }

    /**
     * @return type string
     */
    public function getDatestart() {
        return $this->datestart;
    }

    /**
     * @param type $datestart
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setDatestart($datestart) {
        $this->datestart = $datestart;
        return $this;
    }

    /**
     * @return type string
     */
    public function getDatefinal() {
        return $this->datefinal;
    }

    /**
     * @param type $datefinal
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setDatefinal($datefinal) {
        $this->datefinal = $datefinal;
        return $this;
    }

    /**
     * @return type string
     */
    public function getCyclestart() {
        return $this->cyclestart;
    }

    /**
     * @param type $cyclestart
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setCyclestart($cyclestart) {
        $this->cyclestart = $cyclestart;
        return $this;
    }

    /**
     * @return type string
     */
    public function getCyclefinal() {
        return $this->cyclefinal;
    }

    /**
     * @param type $cyclefinal
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setCyclefinal($cyclefinal) {
        $this->cyclefinal = $cyclefinal;
        return $this;
    }

    /**
     * @return type string
     */
    public function getExceptionby() {
        return $this->exceptionby;
    }

    /**
     * @param type $exceptionby
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setExceptionby($exceptionby) {
        $this->exceptionby = $exceptionby;
        return $this;
    }

    /**
     * @return type string
     */
    public function getExceptiondo() {
        return $this->exceptiondo;
    }

    /**
     * @param type $exceptiondo
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setExceptiondo($exceptiondo) {
        $this->exceptiondo = $exceptiondo;
        return $this;
    }

    /**
     * @return type boolean
     */
    public function getUseppe() {
        return $this->useppe;
    }

    /**
     * @param type $useppe
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setUseppe($useppe) {
        $this->useppe = $useppe;
        return $this;
    }

    /**
     * @return type boolean
     */
    public function getFlowchoice() {
        return $this->flowchoice;
    }

    /**
     * @param type $flowchoice
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setFlowchoice($flowchoice) {
        $this->flowchoice = $flowchoice;
        return $this;
    }

    /**
     * @return type boolean
     */
    public function getFlowbreach() {
        return $this->flowbreach;
    }

    /**
     * @param type $flowbreach
     * @return \flowprocessingstep\Model\flowprocessingstep
     */
    public function setFlowbreach($flowbreach) {
        $this->flowbreach = $flowbreach;
        return $this;
    }

}