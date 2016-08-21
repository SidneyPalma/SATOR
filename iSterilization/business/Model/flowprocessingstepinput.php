<?php

namespace iSterilization\Model;

/**
 * 
 * @Entity {"name":"flowprocessingstepinput", "logbook":true, "cache":"\\iSterilization\\Cache\\flowprocessingstepinput", "event":"\\iSterilization\\Event\\flowprocessingstepinput"}
 */
class flowprocessingstepinput extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $flowprocessingstepid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $inputpresentationid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":""}
     */
    private $ischecked;

    /**
     * @Policy {"nullable":false, "length":3}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $presentation;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $quantity;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"date", "policy":true, "logallow":true, "default":""}
     */
    private $datevalidity;

    /**
     * @Policy {"nullable":true, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $lotpart;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iSterilization\Model\flowprocessingstepinput
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getFlowprocessingstepid() {
        return $this->flowprocessingstepid;
    }

    /**
     * @param type $flowprocessingstepid
     * @return \iSterilization\Model\flowprocessingstepinput
     */
    public function setFlowprocessingstepid($flowprocessingstepid) {
        $this->flowprocessingstepid = $flowprocessingstepid;
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
     * @return \iSterilization\Model\flowprocessingstepinput
     */
    public function setInputpresentationid($inputpresentationid) {
        $this->inputpresentationid = $inputpresentationid;
        return $this;
    }

    /**
     * @return type boolean
     */
    public function getIschecked() {
        return $this->ischecked;
    }

    /**
     * @param type $ischecked
     * @return \iSterilization\Model\flowprocessingstepinput
     */
    public function setIschecked($ischecked) {
        $this->ischecked = $ischecked;
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
     * @return \iSterilization\Model\flowprocessingstepinput
     */
    public function setPresentation($presentation) {
        $this->presentation = $presentation;
        return $this;
    }

    /**
     * @return type string
     */
    public function getQuantity() {
        return $this->quantity;
    }

    /**
     * @param type $quantity
     * @return \iSterilization\Model\flowprocessingstepinput
     */
    public function setQuantity($quantity) {
        $this->quantity = $quantity;
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
     * @return \iSterilization\Model\flowprocessingstepinput
     */
    public function setDatevalidity($datevalidity) {
        $this->datevalidity = $datevalidity;
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
     * @return \iSterilization\Model\flowprocessingstepinput
     */
    public function setLotpart($lotpart) {
        $this->lotpart = $lotpart;
        return $this;
    }

}