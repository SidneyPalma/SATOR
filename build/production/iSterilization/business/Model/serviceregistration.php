<?php

namespace iSterilization\Model;

/**
 * 
 * @Entity {"name":"serviceregistration", "logbook":true, "cache":"\\iSterilization\\Cache\\serviceregistration", "event":"\\iSterilization\\Event\\serviceregistration"}
 */
class serviceregistration extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $itembaseid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getNameSearch,itembaseid"}
     */
    private $itembasename;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $cmeareasid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getNameSearch,cmeareasid,itembase"}
     */
    private $cmeareasname;

    /**
     * @Policy {"nullable":false, "length":3}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $servicetype;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getEnumSearch,servicetype"}
     */
    private $servicetypedescription;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $description;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $observation;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":"getdate()"}
     */
    private $begintime;

    /**
     * @Policy {"nullable":false, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $begintimeusername;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $enduptime;

    /**
     * @Policy {"nullable":true, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $enduptimeusername;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $resultfield;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $resultvalue;

    /**
     * @Policy {"nullable":true, "length":1}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":"L"}
     */
    private $resultstate;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getEnumSearch,resultstate"}
     */
    private $resultstatedescription;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iSterilization\Model\serviceregistration
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getItembaseid() {
        return $this->itembaseid;
    }

    /**
     * @param type $itembaseid
     * @return \iSterilization\Model\serviceregistration
     */
    public function setItembaseid($itembaseid) {
        $this->itembaseid = $itembaseid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getCmeareasid() {
        return $this->cmeareasid;
    }

    /**
     * @param type $cmeareasid
     * @return \iSterilization\Model\serviceregistration
     */
    public function setCmeareasid($cmeareasid) {
        $this->cmeareasid = $cmeareasid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getServicetype() {
        return $this->servicetype;
    }

    /**
     * @param type $servicetype
     * @return \iSterilization\Model\serviceregistration
     */
    public function setServicetype($servicetype) {
        $this->servicetype = $servicetype;
        return $this;
    }

    /**
     * @return type string
     */
    public function getDescription() {
        return $this->description;
    }

    /**
     * @param type $description
     * @return \iSterilization\Model\serviceregistration
     */
    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }

    /**
     * @return type string
     */
    public function getObservation() {
        return $this->observation;
    }

    /**
     * @param type $observation
     * @return \iSterilization\Model\serviceregistration
     */
    public function setObservation($observation) {
        $this->observation = $observation;
        return $this;
    }

    /**
     * @return type string
     */
    public function getBegintime() {
        return $this->begintime;
    }

    /**
     * @param type $begintime
     * @return \iSterilization\Model\serviceregistration
     */
    public function setBegintime($begintime) {
        $this->begintime = $begintime;
        return $this;
    }

    /**
     * @return type string
     */
    public function getBegintimeusername() {
        return $this->begintimeusername;
    }

    /**
     * @param type $begintimeusername
     * @return \iSterilization\Model\serviceregistration
     */
    public function setBegintimeusername($begintimeusername) {
        $this->begintimeusername = $begintimeusername;
        return $this;
    }

    /**
     * @return type string
     */
    public function getEnduptime() {
        return $this->enduptime;
    }

    /**
     * @param type $enduptime
     * @return \iSterilization\Model\serviceregistration
     */
    public function setEnduptime($enduptime) {
        $this->enduptime = $enduptime;
        return $this;
    }

    /**
     * @return type string
     */
    public function getEnduptimeusername() {
        return $this->enduptimeusername;
    }

    /**
     * @param type $enduptimeusername
     * @return \iSterilization\Model\serviceregistration
     */
    public function setEnduptimeusername($enduptimeusername) {
        $this->enduptimeusername = $enduptimeusername;
        return $this;
    }

    /**
     * @return type string
     */
    public function getResultfield() {
        return $this->resultfield;
    }

    /**
     * @param type $resultfield
     * @return \iSterilization\Model\serviceregistration
     */
    public function setResultfield($resultfield) {
        $this->resultfield = $resultfield;
        return $this;
    }

    /**
     * @return type string
     */
    public function getResultvalue() {
        return $this->resultvalue;
    }

    /**
     * @param type $resultvalue
     * @return \iSterilization\Model\serviceregistration
     */
    public function setResultvalue($resultvalue) {
        $this->resultvalue = $resultvalue;
        return $this;
    }

    /**
     * @return type string
     */
    public function getResultstate() {
        return $this->resultstate;
    }

    /**
     * @param type $resultstate
     * @return \iSterilization\Model\serviceregistration
     */
    public function setResultstate($resultstate) {
        $this->resultstate = $resultstate;
        return $this;
    }

}