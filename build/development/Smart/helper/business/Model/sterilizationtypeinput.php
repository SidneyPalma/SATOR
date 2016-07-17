<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"sterilizationtypeinput", "logbook":true, "cache":"\\iAdmin\\Cache\\sterilizationtypeinput", "event":"\\iAdmin\\Event\\sterilizationtypeinput"}
 */
class sterilizationtypeinput extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $sterilizationtypeid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $inputpresentationid;

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
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\sterilizationtypeinput
     */
    public function setId($id) {
        $this->id = $id;
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
     * @return \iAdmin\Model\sterilizationtypeinput
     */
    public function setSterilizationtypeid($sterilizationtypeid) {
        $this->sterilizationtypeid = $sterilizationtypeid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getInputpresentationid() {
        return $this->inputpresentationid;
    }

    /**
     * @param type $inputpresentationid
     * @return \iAdmin\Model\sterilizationtypeinput
     */
    public function setInputpresentationid($inputpresentationid) {
        $this->inputpresentationid = $inputpresentationid;
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
     * @return \iAdmin\Model\sterilizationtypeinput
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
     * @return \iAdmin\Model\sterilizationtypeinput
     */
    public function setAcronym($acronym) {
        $this->acronym = $acronym;
        return $this;
    }

}