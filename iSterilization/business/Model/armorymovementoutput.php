<?php

namespace iSterilization\Model;

/**
 * 
 * @Entity {"name":"armorymovementoutput", "logbook":true, "cache":"\\iSterilization\\Cache\\armorymovementoutput", "event":"\\iSterilization\\Event\\armorymovementoutput"}
 */
class armorymovementoutput extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $clientid;

    /**
     * @Policy {"nullable":true, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $barcode;

    /**
     * @Policy {"nullable":true, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $patientname;

    /**
     * @Policy {"nullable":true, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $surgicalwarning;

    /**
     * @Policy {"nullable":true, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $instrumentator;

    /**
     * @Policy {"nullable":true, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $flowing;

    /**
     * @Policy {"nullable":true, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $place;

    /**
     * @Policy {"nullable":true, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $transportedby;

    /**
     * @Policy {"nullable":true, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $surgicalroom;

    /**
     * @Policy {"nullable":true, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $surgical;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"date", "policy":true, "logallow":true, "default":""}
     */
    private $dateof;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"time", "policy":true, "logallow":true, "default":""}
     */
    private $timeof;

    /**
     * @Policy {"nullable":true, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $boxsealone;

	/**
	 * @Policy {"nullable":true, "length":20}
	 * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
	 */	
	private $boxsealtwo;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iSterilization\Model\armorymovementoutput
     */
    public function setId($id) {
        $this->id = $id;
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
     * @return \iSterilization\Model\armorymovementoutput
     */
    public function setClientid($clientid) {
        $this->clientid = $clientid;
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
     * @return \iSterilization\Model\armorymovementoutput
     */
    public function setBarcode($barcode) {
        $this->barcode = $barcode;
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
     * @return \iSterilization\Model\armorymovementoutput
     */
    public function setPatientname($patientname) {
        $this->patientname = $patientname;
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
     * @return \iSterilization\Model\armorymovementoutput
     */
    public function setSurgicalwarning($surgicalwarning) {
        $this->surgicalwarning = $surgicalwarning;
        return $this;
    }

    /**
     * @return type string
     */
    public function getInstrumentator() {
        return $this->instrumentator;
    }

    /**
     * @param type $instrumentator
     * @return \iSterilization\Model\armorymovementoutput
     */
    public function setInstrumentator($instrumentator) {
        $this->instrumentator = $instrumentator;
        return $this;
    }

    /**
     * @return type string
     */
    public function getFlowing() {
        return $this->flowing;
    }

    /**
     * @param type $flowing
     * @return \iSterilization\Model\armorymovementoutput
     */
    public function setFlowing($flowing) {
        $this->flowing = $flowing;
        return $this;
    }

    /**
     * @return type string
     */
    public function getPlace() {
        return $this->place;
    }

    /**
     * @param type $place
     * @return \iSterilization\Model\armorymovementoutput
     */
    public function setPlace($place) {
        $this->place = $place;
        return $this;
    }

    /**
     * @return type string
     */
    public function getTransportedby() {
        return $this->transportedby;
    }

    /**
     * @param type $transportedby
     * @return \iSterilization\Model\armorymovementoutput
     */
    public function setTransportedby($transportedby) {
        $this->transportedby = $transportedby;
        return $this;
    }

    /**
     * @return type string
     */
    public function getSurgicalroom() {
        return $this->surgicalroom;
    }

    /**
     * @param type $surgicalroom
     * @return \iSterilization\Model\armorymovementoutput
     */
    public function setSurgicalroom($surgicalroom) {
        $this->surgicalroom = $surgicalroom;
        return $this;
    }

    /**
     * @return type string
     */
    public function getSurgical() {
        return $this->surgical;
    }

    /**
     * @param type $surgical
     * @return \iSterilization\Model\armorymovementoutput
     */
    public function setSurgical($surgical) {
        $this->surgical = $surgical;
        return $this;
    }

    /**
     * @return type date
     */
    public function getDateof() {
        return $this->dateof;
    }

    /**
     * @param type $dateof
     * @return \iSterilization\Model\armorymovementoutput
     */
    public function setDateof($dateof) {
        $this->dateof = $dateof;
        return $this;
    }

    /**
     * @return type time
     */
    public function getTimeof() {
        return $this->timeof;
    }

    /**
     * @param type $timeof
     * @return \iSterilization\Model\armorymovementoutput
     */
    public function setTimeof($timeof) {
        $this->timeof = $timeof;
        return $this;
    }

    /**
     * @return type string
     */
    public function getBoxsealone() {
        return $this->boxsealone;
    }

    /**
     * @param type $boxsealone
     * @return \iSterilization\Model\armorymovementoutput
     */
    public function setBoxsealone($boxsealone) {
        $this->boxsealone = $boxsealone;
        return $this;
    }

	/**
	 * @return type string
	 */
	public function getBoxsealtwo() {
		return $this->boxsealtwo;
	}

	/**
	 * @param type $boxsealtwo
	 * @return \iSterilization\Model\armorymovementoutput
	 */
	public function setBoxsealtwo($boxsealtwo) {
		$this->boxsealtwo = $boxsealtwo;
		return $this;
	}

}