<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"materialboxitem", "logbook":true, "cache":"\\iAdmin\\Cache\\materialboxitem", "event":"\\iAdmin\\Event\\materialboxitem"}
 */
class materialboxitem extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $materialboxid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $materialid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getItemSearch,materialid"}
     */
    private $materialname;

    /**
     * @Policy {"nullable":false, "length":1}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":"A"}
     */
    private $boxitemstatus;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getEnumSearch,boxitemstatus"}
     */
    private $boxitemstatusdescription;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $observation;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":""}
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
     * @return \iAdmin\Model\materialboxitem
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getMaterialboxid() {
        return $this->materialboxid;
    }

    /**
     * @param type $materialboxid
     * @return \iAdmin\Model\materialboxitem
     */
    public function setMaterialboxid($materialboxid) {
        $this->materialboxid = $materialboxid;
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
     * @return \iAdmin\Model\materialboxitem
     */
    public function setMaterialid($materialid) {
        $this->materialid = $materialid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getBoxitemstatus() {
        return $this->boxitemstatus;
    }

    /**
     * @param type $boxitemstatus
     * @return \iAdmin\Model\materialboxitem
     */
    public function setBoxitemstatus($boxitemstatus) {
        $this->boxitemstatus = $boxitemstatus;
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
     * @return \iAdmin\Model\materialboxitem
     */
    public function setObservation($observation) {
        $this->observation = $observation;
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
     * @return \iAdmin\Model\input
     */
    public function setIsactive($isactive) {
        $this->isactive = $isactive;
        return $this;
    }

}