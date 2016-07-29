<?php

namespace iSterilization\Model;

/**
 * 
 * @Entity {"name":"flowprocessing", "logbook":true, "cache":"\\iSterilization\\Cache\\flowprocessing", "event":"\\iSterilization\\Event\\flowprocessing"}
 */
class flowprocessing extends \Smart\Data\Model {

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
    private $areasid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $materialid;

    /**
     * @Policy {"nullable":false, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $username;

    /**
     * @Policy {"nullable":false, "length":1}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $prioritylevel;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $dateof;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $materialboxid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $dateto;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $placeid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $clientid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $flowingid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $instrumentatorid;

    /**
     * @Policy {"nullable":true, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $surgicalwarning;

    /**
     * @Policy {"nullable":true, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $patientname;

    /**
     * @Policy {"nullable":true, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $healthinsurance;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iSterilization\Model\flowprocessing
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
     * @return \iSterilization\Model\flowprocessing
     */
    public function setSterilizationtypeid($sterilizationtypeid) {
        $this->sterilizationtypeid = $sterilizationtypeid;
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
     * @return \iSterilization\Model\flowprocessing
     */
    public function setAreasid($areasid) {
        $this->areasid = $areasid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getMaterialid() {
        return $this->materialid;
    }

    /**
     * @param type $materialid
     * @return \iSterilization\Model\flowprocessing
     */
    public function setMaterialid($materialid) {
        $this->materialid = $materialid;
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
     * @return \iSterilization\Model\flowprocessing
     */
    public function setUsername($username) {
        $this->username = $username;
        return $this;
    }

    /**
     * @return type string
     */
    public function getPrioritylevel() {
        return $this->prioritylevel;
    }

    /**
     * @param type $prioritylevel
     * @return \iSterilization\Model\flowprocessing
     */
    public function setPrioritylevel($prioritylevel) {
        $this->prioritylevel = $prioritylevel;
        return $this;
    }

    /**
     * @return type string
     */
    public function getDateof() {
        return $this->dateof;
    }

    /**
     * @param type $dateof
     * @return \iSterilization\Model\flowprocessing
     */
    public function setDateof($dateof) {
        $this->dateof = $dateof;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getMaterialboxid() {
        return $this->materialboxid;
    }

    /**
     * @param type $materialboxid
     * @return \iSterilization\Model\flowprocessing
     */
    public function setMaterialboxid($materialboxid) {
        $this->materialboxid = $materialboxid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getDateto() {
        return $this->dateto;
    }

    /**
     * @param type $dateto
     * @return \iSterilization\Model\flowprocessing
     */
    public function setDateto($dateto) {
        $this->dateto = $dateto;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getPlaceid() {
        return $this->placeid;
    }

    /**
     * @param type $placeid
     * @return \iSterilization\Model\flowprocessing
     */
    public function setPlaceid($placeid) {
        $this->placeid = $placeid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getClientid() {
        return $this->clientid;
    }

    /**
     * @param type $clientid
     * @return \iSterilization\Model\flowprocessing
     */
    public function setClientid($clientid) {
        $this->clientid = $clientid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getFlowingid() {
        return $this->flowingid;
    }

    /**
     * @param type $flowingid
     * @return \iSterilization\Model\flowprocessing
     */
    public function setFlowingid($flowingid) {
        $this->flowingid = $flowingid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getInstrumentatorid() {
        return $this->instrumentatorid;
    }

    /**
     * @param type $instrumentatorid
     * @return \iSterilization\Model\flowprocessing
     */
    public function setInstrumentatorid($instrumentatorid) {
        $this->instrumentatorid = $instrumentatorid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getSurgicalwarning() {
        return $this->surgicalwarning;
    }

    /**
     * @param type $surgicalwarning
     * @return \iSterilization\Model\flowprocessing
     */
    public function setSurgicalwarning($surgicalwarning) {
        $this->surgicalwarning = $surgicalwarning;
        return $this;
    }

    /**
     * @return type string
     */
    public function getPatientname() {
        return $this->patientname;
    }

    /**
     * @param type $patientname
     * @return \iSterilization\Model\flowprocessing
     */
    public function setPatientname($patientname) {
        $this->patientname = $patientname;
        return $this;
    }

    /**
     * @return type string
     */
    public function getHealthinsurance() {
        return $this->healthinsurance;
    }

    /**
     * @param type $healthinsurance
     * @return \iSterilization\Model\flowprocessing
     */
    public function setHealthinsurance($healthinsurance) {
        $this->healthinsurance = $healthinsurance;
        return $this;
    }

}