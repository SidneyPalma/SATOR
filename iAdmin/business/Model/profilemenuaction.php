<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"profilemenuaction", "logbook":true, "cache":"\\iAdmin\\Cache\\profilemenuaction", "event":"\\iAdmin\\Event\\profilemenuaction"}
 */
class profilemenuaction extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $profilemenuid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $menuactionid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"date", "policy":true, "logallow":true, "default":""}
     */
    private $expireto;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\profilemenuaction
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getProfilemenuid() {
        return $this->profilemenuid;
    }

    /**
     * @param type $profilemenuid
     * @return \iAdmin\Model\profilemenuaction
     */
    public function setProfilemenuid($profilemenuid) {
        $this->profilemenuid = $profilemenuid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getMenuactionid() {
        return $this->menuactionid;
    }

    /**
     * @param type $menuactionid
     * @return \iAdmin\Model\profilemenuaction
     */
    public function setMenuactionid($menuactionid) {
        $this->menuactionid = $menuactionid;
        return $this;
    }

    /**
     * @return type date
     */
    public function getExpireto() {
        return $this->expireto;
    }

    /**
     * @param type $expireto
     * @return \iAdmin\Model\profilemenuaction
     */
    public function setExpireto($expireto) {
        $this->expireto = $expireto;
        return $this;
    }

}