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
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $armorymovementitemid;

    /**
     * @Policy {"nullable":false, "length":1}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $armorystatus;

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
     * @return type integer
     */
    public function getArmorymovementitemid() {
        return $this->armorymovementitemid;
    }

    /**
     * @param type $armorymovementitemid
     * @return \iSterilization\Model\armorystock
     */
    public function setArmorymovementitemid($armorymovementitemid) {
        $this->armorymovementitemid = $armorymovementitemid;
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

}