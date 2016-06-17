<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"profilemenu", "logbook":true, "cache":"\\iAdmin\\Cache\\profilemenu", "event":"\\iAdmin\\Event\\profilemenu"}
 */
class profilemenu extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $profileid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $menuid;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\profilemenu
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getProfileid() {
        return $this->profileid;
    }

    /**
     * @param type $profileid
     * @return \iAdmin\Model\profilemenu
     */
    public function setProfileid($profileid) {
        $this->profileid = $profileid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getMenuid() {
        return $this->menuid;
    }

    /**
     * @param type $menuid
     * @return \iAdmin\Model\profilemenu
     */
    public function setMenuid($menuid) {
        $this->menuid = $menuid;
        return $this;
    }

}