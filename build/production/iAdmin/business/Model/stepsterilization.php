<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"stepsterilization", "logbook":true, "cache":"\\iAdmin\\Cache\\stepsterilization", "event":"\\iAdmin\\Event\\stepsterilization"}
 */
class stepsterilization extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $name;

    /**
     * @Policy {"nullable":false, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $description;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $cmeareasid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getNameSearch,cmeareasid"}
     */
    private $cmeareasname;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $equipmentid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getNameSearch,equipmentid"}
     */
    private $equipmentname;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $sterilizationtypeid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getNameSearch,sterilizationtypeid"}
     */
    private $sterilizationtypename;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $timecycleprocess;

    /**
     * @Policy {"nullable":true, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $labelpreparation;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $stepflaglist;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":"1"}
     */
    private $isactive;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\stepsterilization
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type string
     */
    public function getName() {
        return $this->name;
    }

    /**
     * @param type $name
     * @return \iAdmin\Model\stepsterilization
     */
    public function setName($name) {
        $this->name = $name;
        return $this;
    }

    /**
     * @return type string
     */
    public function getDescription() {
        return $this->description;
    }

    /**
     * @param type $description
     * @return \iAdmin\Model\stepsterilization
     */
    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getCmeareasid() {
        return $this->cmeareasid;
    }

    /**
     * @param type $cmeareasid
     * @return \iAdmin\Model\stepsterilization
     */
    public function setCmeareasid($cmeareasid) {
        $this->cmeareasid = $cmeareasid;
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
     * @return \iAdmin\Model\stepsterilization
     */
    public function setEquipmentid($equipmentid) {
        $this->equipmentid = $equipmentid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getSterilizationtypeid() {
        return $this->sterilizationtypeid;
    }

    /**
     * @param type $sterilizationtypeid
     * @return \iAdmin\Model\stepsterilization
     */
    public function setSterilizationtypeid($sterilizationtypeid) {
        $this->sterilizationtypeid = $sterilizationtypeid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getTimecycleprocess() {
        return $this->timecycleprocess;
    }

    /**
     * @param type $timecycleprocess
     * @return \iAdmin\Model\stepsterilization
     */
    public function setTimecycleprocess($timecycleprocess) {
        $this->timecycleprocess = $timecycleprocess;
        return $this;
    }

    /**
     * @return type string
     */
    public function getLabelpreparation() {
        return $this->labelpreparation;
    }

    /**
     * @param type $labelpreparation
     * @return \iAdmin\Model\stepsterilization
     */
    public function setLabelpreparation($labelpreparation) {
        $this->labelpreparation = $labelpreparation;
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
     * @return \iAdmin\Model\stepsterilization
     */
    public function setStepflaglist($stepflaglist) {
        $this->stepflaglist = $stepflaglist;
        return $this;
    }

    /**
     * @return type boolean
     */
    public function getIsactive() {
        return $this->isactive;
    }

    /**
     * @param type $isactive
     * @return \iAdmin\Model\stepsterilization
     */
    public function setIsactive($isactive) {
        $this->isactive = $isactive;
        return $this;
    }

}