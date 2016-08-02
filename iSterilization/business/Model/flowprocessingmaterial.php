<?php

namespace iSterilization\Model;

/**
 * 
 * @Entity {"name":"flowprocessingmaterial", "logbook":true, "cache":"\\iSterilization\\Cache\\flowprocessingmaterial", "event":"\\iSterilization\\Event\\flowprocessingmaterial"}
 */
class flowprocessingmaterial extends \Smart\Data\Model {

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
    private $materialid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getNameSearch,materialid,itembase"}
     */
    private $materialname;

    /**
     * @Policy {"nullable":false, "length":3}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $unconformities;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getEnumSearch,unconformities"}
     */
    private $unconformitiesdescription;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"date", "policy":true, "logallow":true, "default":""}
     */
    private $dateof;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iSterilization\Model\flowprocessingmaterial
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
     * @return \iSterilization\Model\flowprocessingmaterial
     */
    public function setFlowprocessingstepid($flowprocessingstepid) {
        $this->flowprocessingstepid = $flowprocessingstepid;
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
     * @return \iSterilization\Model\flowprocessingmaterial
     */
    public function setMaterialid($materialid) {
        $this->materialid = $materialid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getUnconformities() {
        return $this->unconformities;
    }

    /**
     * @param type $unconformities
     * @return \iSterilization\Model\flowprocessingmaterial
     */
    public function setUnconformities($unconformities) {
        $this->unconformities = $unconformities;
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
     * @return \iSterilization\Model\flowprocessingmaterial
     */
    public function setDateof($dateof) {
        $this->dateof = $dateof;
        return $this;
    }

}