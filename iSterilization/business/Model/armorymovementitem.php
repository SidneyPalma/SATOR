<?php

namespace iSterilization\Model;

/**
 * 
 * @Entity {"name":"armorymovementitem", "logbook":true, "cache":"\\iSterilization\\Cache\\armorymovementitem", "event":"\\iSterilization\\Event\\armorymovementitem"}
 */
class armorymovementitem extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $armorymovementid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $flowprocessingstepid;

    /**
     * @Policy {"nullable":false, "length":3}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $armorylocal;

    /**
     * @Policy {"nullable":true, "length":250}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $justified;

    /**
     * @Policy {"nullable":true, "length":1}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $outputtype;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iSterilization\Model\armorymovementitem
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getArmorymovementid() {
        return $this->armorymovementid;
    }

    /**
     * @param type $armorymovementid
     * @return \iSterilization\Model\armorymovementitem
     */
    public function setArmorymovementid($armorymovementid) {
        $this->armorymovementid = $armorymovementid;
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
     * @return \iSterilization\Model\armorymovementitem
     */
    public function setFlowprocessingstepid($flowprocessingstepid) {
        $this->flowprocessingstepid = $flowprocessingstepid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getArmorylocal() {
        return $this->armorylocal;
    }

    /**
     * @param type $armorylocal
     * @return \iSterilization\Model\armorymovementitem
     */
    public function setArmorylocal($armorylocal) {
        $this->armorylocal = $armorylocal;
        return $this;
    }

    /**
     * @return type string
     */
    public function getJustified() {
        return $this->justified;
    }

    /**
     * @param type $justified
     * @return \iSterilization\Model\armorymovementitem
     */
    public function setJustified($justified) {
        $this->justified = $justified;
        return $this;
    }

    /**
     * @return type string
     */
    public function getOutputtype() {
        return $this->outputtype;
    }

    /**
     * @param type $outputtype
     * @return \iSterilization\Model\armorymovementitem
     */
    public function setOutputtype($outputtype) {
        $this->outputtype = $outputtype;
        return $this;
    }

}