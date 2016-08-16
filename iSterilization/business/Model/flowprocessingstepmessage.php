<?php

namespace iSterilization\Model;

/**
 * 
 * @Entity {"name":"flowprocessingstepmessage", "logbook":true, "cache":"\\iSterilization\\Cache\\flowprocessingstepmessage", "event":"\\iSterilization\\Event\\flowprocessingstepmessage"}
 */
class flowprocessingstepmessage extends \Smart\Data\Model {

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
    private $readercode;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $readertext;

    /**
     * @Policy {"nullable":false, "length":60}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $readershow;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $readerdate;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iSterilization\Model\flowprocessingstepmessage
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
     * @return \iSterilization\Model\flowprocessingstepmessage
     */
    public function setFlowprocessingstepid($flowprocessingstepid) {
        $this->flowprocessingstepid = $flowprocessingstepid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getReadercode() {
        return $this->readercode;
    }

    /**
     * @param type $readercode
     * @return \iSterilization\Model\flowprocessingstepmessage
     */
    public function setReadercode($readercode) {
        $this->readercode = $readercode;
        return $this;
    }

    /**
     * @return type string
     */
    public function getReadertext() {
        return $this->readertext;
    }

    /**
     * @param type $readertext
     * @return \iSterilization\Model\flowprocessingstepmessage
     */
    public function setReadertext($readertext) {
        $this->readertext = $readertext;
        return $this;
    }

    /**
     * @return type string
     */
    public function getReadershow() {
        return $this->readershow;
    }

    /**
     * @param type $readershow
     * @return \iSterilization\Model\flowprocessingstepmessage
     */
    public function setReadershow($readershow) {
        $this->readershow = $readershow;
        return $this;
    }

    /**
     * @return type string
     */
    public function getReaderdate() {
        return $this->readerdate;
    }

    /**
     * @param type $readerdate
     * @return \iSterilization\Model\flowprocessingstepmessage
     */
    public function setReaderdate($readerdate) {
        $this->readerdate = $readerdate;
        return $this;
    }

}