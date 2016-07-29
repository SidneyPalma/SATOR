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
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $steplevel;

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
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $steppriority;

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
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iSterilization\Model\flowprocessingstep
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
     * @return \iSterilization\Model\flowprocessingstep
     */
    public function setFlowprocessingid($flowprocessingid) {
        $this->flowprocessingid = $flowprocessingid;
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
     * @return \iSterilization\Model\flowprocessingstep
     */
    public function setSteplevel($steplevel) {
        $this->steplevel = $steplevel;
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
     * @return \iSterilization\Model\flowprocessingstep
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
     * @return \iSterilization\Model\flowprocessingstep
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
     * @return \iSterilization\Model\flowprocessingstep
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
     * @return \iSterilization\Model\flowprocessingstep
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
     * @return \iSterilization\Model\flowprocessingstep
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
     * @return \iSterilization\Model\flowprocessingstep
     */
    public function setEquipmentid($equipmentid) {
        $this->equipmentid = $equipmentid;
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
     * @return \iSterilization\Model\flowprocessingstep
     */
    public function setSteppriority($steppriority) {
        $this->steppriority = $steppriority;
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
     * @return \iSterilization\Model\flowprocessingstep
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
     * @return \iSterilization\Model\flowprocessingstep
     */
    public function setTarget($target) {
        $this->target = $target;
        return $this;
    }

}