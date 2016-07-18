<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"equipmentcycle", "logbook":true, "cache":"\\iAdmin\\Cache\\equipmentcycle", "event":"\\iAdmin\\Event\\equipmentcycle"}
 */
class equipmentcycle extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $equipmentid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $cycleid;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\equipmentcycle
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getEquipmentid() {
        return $this->equipmentid;
    }

    /**
     * @param type $equipmentid
     * @return \iAdmin\Model\equipmentcycle
     */
    public function setEquipmentid($equipmentid) {
        $this->equipmentid = $equipmentid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getCycleid() {
        return $this->cycleid;
    }

    /**
     * @param type $cycleid
     * @return \iAdmin\Model\equipmentcycle
     */
    public function setCycleid($cycleid) {
        $this->cycleid = $cycleid;
        return $this;
    }

}