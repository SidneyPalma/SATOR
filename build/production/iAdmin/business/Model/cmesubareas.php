<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"cmesubareas", "logbook":true, "cache":"\\iAdmin\\Cache\\cmesubareas", "event":"\\iAdmin\\Event\\cmesubareas"}
 */
class cmesubareas extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"NONE", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $cmeareasid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getNameSearch,cmeareasid"}
     */
    private $cmeareasname;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\cmesubareas
     */
    public function setId($id) {
        $this->id = $id;
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
     * @return \iAdmin\Model\cmesubareas
     */
    public function setCmeareasid($cmeareasid) {
        $this->cmeareasid = $cmeareasid;
        return $this;
    }

}