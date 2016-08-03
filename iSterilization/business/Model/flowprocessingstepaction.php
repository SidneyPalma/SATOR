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

}