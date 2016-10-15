<?php

namespace iSterilization\Model;

/**
 * 
 * @Entity {"name":"armorystock", "logbook":true, "cache":"\\iSterilization\\Cache\\armorystock", "event":"\\iSterilization\\Event\\armorystock"}
 */
class armorystock extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "length":1}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $armorystatus;

    /**
     * @Policy {"nullable":false, "length":3}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $armorylocal;

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
     * @return \iSterilization\Model\armorystock
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type string
     */
    public function getArmorystatus() {
        return $this->armorystatus;
    }

    /**
     * @param type $armorystatus
     * @return \iSterilization\Model\armorystock
     */
    public function setArmorystatus($armorystatus) {
        $this->armorystatus = $armorystatus;
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
     * @return \iSterilization\Model\armorystock
     */
    public function setArmorylocal($armorylocal) {
        $this->armorylocal = $armorylocal;
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
     * @return \iSterilization\Model\armorystock
     */
    public function setFlowprocessingstepid($flowprocessingstepid) {
        $this->flowprocessingstepid = $flowprocessingstepid;
        return $this;
    }

}