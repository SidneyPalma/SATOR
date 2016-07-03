<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"equipment", "logbook":true, "cache":"\\iAdmin\\Cache\\equipment", "event":"\\iAdmin\\Event\\equipment"}
 */
class equipment extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"NONE", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $cmeareasid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getNameSearch,cmeareasid,areas"}
     */
    private $cmeareasname;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $equipmentstatusid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getNameSearch,equipmentstatusid"}
     */
    private $equipmentstatusname;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":""}
     */
    private $sterilizationflow;

    /**
     * @Policy {"nullable":true, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $sterilizationname;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $manufactureryear;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $capacity;

    /**
     * @Policy {"nullable":true, "length":30}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $design;

    /**
     * @Policy {"nullable":true, "length":60}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $serialnumber;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"date", "policy":true, "logallow":true, "default":""}
     */
    private $registrationanvisavalid;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\equipment
     */
    public function setId($id) {
        $this->id = $id;
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
     * @return \iAdmin\Model\equipment
     */
    public function setCmeareasid($cmeareasid) {
        $this->cmeareasid = $cmeareasid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getEquipmentstatusid() {
        return $this->equipmentstatusid;
    }

    /**
     * @param type $equipmentstatusid
     * @return \iAdmin\Model\equipment
     */
    public function setEquipmentstatusid($equipmentstatusid) {
        $this->equipmentstatusid = $equipmentstatusid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getManufactureryear() {
        return $this->manufactureryear;
    }

    /**
     * @param type $manufactureryear
     * @return \iAdmin\Model\equipment
     */
    public function setManufactureryear($manufactureryear) {
        $this->manufactureryear = $manufactureryear;
        return $this;
    }

    /**
     * @return type boolean
     */
    public function getSterilizationflow() {
        return $this->sterilizationflow;
    }

    /**
     * @param type $sterilizationflow
     * @return \iAdmin\Model\equipment
     */
    public function setSterilizationflow($sterilizationflow) {
        $this->sterilizationflow = $sterilizationflow;
        return $this;
    }

    /**
     * @return type string
     */
    public function getSterilizationname() {
        return $this->sterilizationname;
    }

    /**
     * @param type $sterilizationname
     * @return \iAdmin\Model\equipment
     */
    public function setSterilizationname($sterilizationname) {
        $this->sterilizationname = $sterilizationname;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getCapacity() {
        return $this->capacity;
    }

    /**
     * @param type $capacity
     * @return \iAdmin\Model\equipment
     */
    public function setCapacity($capacity) {
        $this->capacity = $capacity;
        return $this;
    }

    /**
     * @return type string
     */
    public function getDesign() {
        return $this->design;
    }

    /**
     * @param type $design
     * @return \iAdmin\Model\equipment
     */
    public function setDesign($design) {
        $this->design = $design;
        return $this;
    }

    /**
     * @return type string
     */
    public function getSerialnumber() {
        return $this->serialnumber;
    }

    /**
     * @param type $serialnumber
     * @return \iAdmin\Model\equipment
     */
    public function setSerialnumber($serialnumber) {
        $this->serialnumber = $serialnumber;
        return $this;
    }

    /**
     * @return type date
     */
    public function getRegistrationanvisavalid() {
        return $this->registrationanvisavalid;
    }

    /**
     * @param type $registrationanvisavalid
     * @return \iAdmin\Model\equipment
     */
    public function setRegistrationanvisavalid($registrationanvisavalid) {
        $this->registrationanvisavalid = $registrationanvisavalid;
        return $this;
    }

}