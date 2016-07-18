<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"materialcycle", "logbook":true, "cache":"\\iAdmin\\Cache\\materialcycle", "event":"\\iAdmin\\Event\\materialcycle"}
 */
class materialcycle extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $materialid;

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
     * @return \iAdmin\Model\materialcycle
     */
    public function setId($id) {
        $this->id = $id;
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
     * @return \iAdmin\Model\materialcycle
     */
    public function setMaterialid($materialid) {
        $this->materialid = $materialid;
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
     * @return \iAdmin\Model\materialcycle
     */
    public function setCycleid($cycleid) {
        $this->cycleid = $cycleid;
        return $this;
    }

}