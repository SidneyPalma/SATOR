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
    private $inputid;

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
    public function getInputid() {
        return $this->inputid;
    }

    /**
     * @param type $inputid
     * @return \iAdmin\Model\sterilizationtypeinput
     */
    public function setInputid($inputid) {
        $this->inputid = $inputid;
        return $this;
    }

}