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

}