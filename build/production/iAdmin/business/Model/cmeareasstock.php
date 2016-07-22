<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"cmeareasstock", "logbook":true, "cache":"\\iAdmin\\Cache\\cmeareasstock", "event":"\\iAdmin\\Event\\cmeareasstock"}
 */
class cmeareasstock extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $inputid;

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
    private $equipmentid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getNameSearch,equipmentid,itembase"}
     */
    private $equipmentname;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"date", "policy":true, "logallow":true, "default":""}
     */
    private $datevalidity;

    /**
     * @Policy {"nullable":false, "length":3}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $presentation;

    /**
     * @Policy {"nullable":true, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $lotpart;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $lotamount;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\cmeareasstock
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getInputid() {
        return $this->inputid;
    }

    /**
     * @param type $inputid
     * @return \iAdmin\Model\cmeareasstock
     */
    public function setInputid($inputid) {
        $this->inputid = $inputid;
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
     * @return \iAdmin\Model\cmeareasstock
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
     * @return \iAdmin\Model\cmeareasstock
     */
    public function setEquipmentid($equipmentid) {
        $this->equipmentid = $equipmentid;
        return $this;
    }

    /**
     * @return type date
     */
    public function getDatevalidity() {
        return $this->datevalidity;
    }

    /**
     * @param type $datevalidity
     * @return \iAdmin\Model\cmeareasstock
     */
    public function setDatevalidity($datevalidity) {
        $this->datevalidity = $datevalidity;
        return $this;
    }

    /**
     * @return type string
     */
    public function getPresentation() {
        return $this->presentation;
    }

    /**
     * @param type $presentation
     * @return \iAdmin\Model\cmeareasstock
     */
    public function setPresentation($presentation) {
        $this->presentation = $presentation;
        return $this;
    }

    /**
     * @return type string
     */
    public function getLotpart() {
        return $this->lotpart;
    }

    /**
     * @param type $lotpart
     * @return \iAdmin\Model\cmeareasstock
     */
    public function setLotpart($lotpart) {
        $this->lotpart = $lotpart;
        return $this;
    }

    /**
     * @return type string
     */
    public function getLotamount() {
        return $this->lotamount;
    }

    /**
     * @param type $lotamount
     * @return \iAdmin\Model\cmeareasstock
     */
    public function setLotamount($lotamount) {
        $this->lotamount = $lotamount;
        return $this;
    }

}