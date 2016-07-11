<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"unitmeasurement", "logbook":true, "cache":"\\iAdmin\\Cache\\unitmeasurement", "event":"\\iAdmin\\Event\\unitmeasurement"}
 */
class unitmeasurement extends \Smart\Data\Model {

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
     * @Policy {"nullable":false, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $acronym;

    /**
     * @Policy {"nullable":false, "length":60}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $packing;

    /**
     * @Policy {"nullable":false, "length":60}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $baseunit;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $measurebase;

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
     * @return \iAdmin\Model\unitmeasurement
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
     * @return \iAdmin\Model\unitmeasurement
     */
    public function setName($name) {
        $this->name = $name;
        return $this;
    }

    /**
     * @return type string
     */
    public function getAcronym() {
        return $this->acronym;
    }

    /**
     * @param type $acronym
     * @return \iAdmin\Model\unitmeasurement
     */
    public function setAcronym($acronym) {
        $this->acronym = $acronym;
        return $this;
    }

    /**
     * @return type string
     */
    public function getPacking() {
        return $this->packing;
    }

    /**
     * @param type $packing
     * @return \iAdmin\Model\unitmeasurement
     */
    public function setPacking($packing) {
        $this->packing = $packing;
        return $this;
    }

    /**
     * @return type string
     */
    public function getBaseunit() {
        return $this->baseunit;
    }

    /**
     * @param type $baseunit
     * @return \iAdmin\Model\unitmeasurement
     */
    public function setBaseunit($baseunit) {
        $this->baseunit = $baseunit;
        return $this;
    }

    /**
     * @return type string
     */
    public function getMeasurebase() {
        return $this->measurebase;
    }

    /**
     * @param type $measurebase
     * @return \iAdmin\Model\unitmeasurement
     */
    public function setMeasurebase($measurebase) {
        $this->measurebase = $measurebase;
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
     * @return \iAdmin\Model\unitmeasurement
     */
    public function setIsactive($isactive) {
        $this->isactive = $isactive;
        return $this;
    }

}