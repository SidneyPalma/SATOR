<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"usersmenuaction", "logbook":true, "cache":"\\iAdmin\\Cache\\usersmenuaction", "event":"\\iAdmin\\Event\\usersmenuaction"}
 */
class usersmenuaction extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $usersmenuid;

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
     * @return \iAdmin\Model\usersmenuaction
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getUsersmenuid() {
        return $this->usersmenuid;
    }

    /**
     * @param type $usersmenuid
     * @return \iAdmin\Model\usersmenuaction
     */
    public function setUsersmenuid($usersmenuid) {
        $this->usersmenuid = $usersmenuid;
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
     * @return \iAdmin\Model\usersmenuaction
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
     * @return \iAdmin\Model\usersmenuaction
     */
    public function setExpireto($expireto) {
        $this->expireto = $expireto;
        return $this;
    }

}