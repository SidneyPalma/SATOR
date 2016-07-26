<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"itembase", "logbook":true, "cache":"\\iAdmin\\Cache\\itembase", "event":"\\iAdmin\\Event\\itembase"}
 */
class itembase extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "length":60}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $name;

    /**
     * @Policy {"nullable":false, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $description;

    /**
     * @Policy {"nullable":false, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $barcode;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $resultfield;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $proprietaryid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $manufacturerid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"date", "policy":true, "logallow":true, "default":""}
     */
    private $dateacquisition;

    /**
     * @Policy {"nullable":true, "length":3}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $itemgroup;

    /**
     * @Policy {"nullable":true, "length":60}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $patrimonialcode;

    /**
     * @Policy {"nullable":true, "length":60}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $registrationanvisa;

    /**
     * @Policy {"nullable":false, "length":1}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":"M"}
     */
    private $itembasetype;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $filedata;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $fileinfo;

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
     * @return \iAdmin\Model\itembase
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
     * @return \iAdmin\Model\itembase
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
     * @return \iAdmin\Model\itembase
     */
    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }

    /**
     * @return type string
     */
    public function getBarcode() {
        return $this->barcode;
    }

    /**
     * @param type $barcode
     * @return \iAdmin\Model\itembase
     */
    public function setBarcode($barcode) {
        $this->barcode = $barcode;
        return $this;
    }

    /**
     * @return type string
     */
    public function getResultfield() {
        return $this->resultfield;
    }

    /**
     * @param type $resultfield
     * @return \iAdmin\Model\itembase
     */
    public function setResultfield($resultfield) {
        $this->resultfield = $resultfield;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getProprietaryid() {
        return $this->proprietaryid;
    }

    /**
     * @param type $proprietaryid
     * @return \iAdmin\Model\itembase
     */
    public function setProprietaryid($proprietaryid) {
        $this->proprietaryid = $proprietaryid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getManufacturerid() {
        return $this->manufacturerid;
    }

    /**
     * @param type $manufacturerid
     * @return \iAdmin\Model\itembase
     */
    public function setManufacturerid($manufacturerid) {
        $this->manufacturerid = $manufacturerid;
        return $this;
    }

    /**
     * @return type date
     */
    public function getDateacquisition() {
        return $this->dateacquisition;
    }

    /**
     * @param type $dateacquisition
     * @return \iAdmin\Model\itembase
     */
    public function setDateacquisition($dateacquisition) {
        $this->dateacquisition = $dateacquisition;
        return $this;
    }

    /**
     * @return type string
     */
    public function getItemgroup() {
        return $this->itemgroup;
    }

    /**
     * @param type $itemgroup
     * @return \iAdmin\Model\itembase
     */
    public function setItemgroup($itemgroup) {
        $this->itemgroup = $itemgroup;
        return $this;
    }

    /**
     * @return type string
     */
    public function getPatrimonialcode() {
        return $this->patrimonialcode;
    }

    /**
     * @param type $patrimonialcode
     * @return \iAdmin\Model\itembase
     */
    public function setPatrimonialcode($patrimonialcode) {
        $this->patrimonialcode = $patrimonialcode;
        return $this;
    }

    /**
     * @return type string
     */
    public function getRegistrationanvisa() {
        return $this->registrationanvisa;
    }

    /**
     * @param type $registrationanvisa
     * @return \iAdmin\Model\itembase
     */
    public function setRegistrationanvisa($registrationanvisa) {
        $this->registrationanvisa = $registrationanvisa;
        return $this;
    }

    /**
     * @return type string
     */
    public function getItembasetype() {
        return $this->itembasetype;
    }

    /**
     * @param type $itembasetype
     * @return \iAdmin\Model\itembase
     */
    public function setItembasetype($itembasetype) {
        $this->itembasetype = $itembasetype;
        return $this;
    }

    /**
     * @return type string
     */
    public function getFiledata() {
        return $this->filedata;
    }

    /**
     * @param type $filedata
     * @return \iAdmin\Model\itembase
     */
    public function setFiledata($filedata) {
        $this->filedata = $filedata;
        return $this;
    }

    /**
     * @return type string
     */
    public function getFileinfo() {
        return $this->fileinfo;
    }

    /**
     * @param type $fileinfo
     * @return \iAdmin\Model\itembase
     */
    public function setFileinfo($fileinfo) {
        $this->fileinfo = $fileinfo;
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
     * @return \iAdmin\Model\itembase
     */
    public function setIsactive($isactive) {
        $this->isactive = $isactive;
        return $this;
    }

}