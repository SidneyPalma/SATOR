<?php

namespace iSterilization\Model;

/**
 * 
 * @Entity {"name":"flowprocessingchargeitem", "logbook":true, "cache":"\\iSterilization\\Cache\\flowprocessingchargeitem", "event":"\\iSterilization\\Event\\flowprocessingchargeitem"}
 */
class flowprocessingchargeitem extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $flowprocessingchargeid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $flowprocessingstepid;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iSterilization\Model\flowprocessingchargeitem
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getFlowprocessingchargeid() {
        return $this->flowprocessingchargeid;
    }

    /**
     * @param type $flowprocessingchargeid
     * @return \iSterilization\Model\flowprocessingchargeitem
     */
    public function setFlowprocessingchargeid($flowprocessingchargeid) {
        $this->flowprocessingchargeid = $flowprocessingchargeid;
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
     * @return \iSterilization\Model\flowprocessingchargeitem
     */
    public function setFlowprocessingstepid($flowprocessingstepid) {
        $this->flowprocessingstepid = $flowprocessingstepid;
        return $this;
    }

}