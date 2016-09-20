<?php

namespace iSterilization\Model;

/**
 * 
 * @Entity {"name":"flowprocessingstepaction", "logbook":true, "cache":"\\iSterilization\\Cache\\flowprocessingstepaction", "event":"\\iSterilization\\Event\\flowprocessingstepaction"}
 */
class flowprocessingstepaction extends \Smart\Data\Model {

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
     * @Policy {"nullable":false, "length":3}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $flowstepaction;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":"1"}
     */
    private $isactive;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $dateof;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $dateto;

    /**
     * @Policy {"nullable":true, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $authorizedby;

    /**
     * @Policy {"nullable":true, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $toreversedby;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iSterilization\Model\flowprocessingstepaction
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
     * @return \iSterilization\Model\flowprocessingstepaction
     */
    public function setFlowprocessingstepid($flowprocessingstepid) {
        $this->flowprocessingstepid = $flowprocessingstepid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getFlowstepaction() {
        return $this->flowstepaction;
    }

    /**
     * @param type $flowstepaction
     * @return \iSterilization\Model\flowprocessingstepaction
     */
    public function setFlowstepaction($flowstepaction) {
        $this->flowstepaction = $flowstepaction;
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
     * @return \iSterilization\Model\flowprocessingstepaction
     */
    public function setIsactive($isactive) {
        $this->isactive = $isactive;
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
     * @return \iSterilization\Model\flowprocessingstepaction
     */
    public function setDateof($dateof) {
        $this->dateof = $dateof;
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
     * @return \iSterilization\Model\flowprocessingstepaction
     */
    public function setDateto($dateto) {
        $this->dateto = $dateto;
        return $this;
    }

    /**
     * @return type string
     */
    public function getAuthorizedby() {
        return $this->authorizedby;
    }

    /**
     * @param type $authorizedby
     * @return \iSterilization\Model\flowprocessingstepaction
     */
    public function setAuthorizedby($authorizedby) {
        $this->authorizedby = $authorizedby;
        return $this;
    }

    /**
     * @return type string
     */
    public function getToreversedby() {
        return $this->toreversedby;
    }

    /**
     * @param type $toreversedby
     * @return \iSterilization\Model\flowprocessingstepaction
     */
    public function setToreversedby($toreversedby) {
        $this->toreversedby = $toreversedby;
        return $this;
    }
}