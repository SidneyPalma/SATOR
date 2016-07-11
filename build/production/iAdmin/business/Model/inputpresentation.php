<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"inputpresentation", "logbook":true, "cache":"\\iAdmin\\Cache\\inputpresentation", "event":"\\iAdmin\\Event\\inputpresentation"}
 */
class inputpresentation extends \Smart\Data\Model {

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
     * @Policy {"nullable":false, "length":3}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $presentation;

    /**
     * @Policy {"nullable":false, "length":3}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $acronym;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $measurebase;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\inputpresentation
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
     * @return \iAdmin\Model\inputpresentation
     */
    public function setInputid($inputid) {
        $this->inputid = $inputid;
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
     * @return \iAdmin\Model\inputpresentation
     */
    public function setPresentation($presentation) {
        $this->presentation = $presentation;
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
     * @return \iAdmin\Model\inputpresentation
     */
    public function setAcronym($acronym) {
        $this->acronym = $acronym;
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
     * @return \iAdmin\Model\inputpresentation
     */
    public function setMeasurebase($measurebase) {
        $this->measurebase = $measurebase;
        return $this;
    }

}