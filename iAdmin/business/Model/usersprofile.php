<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"usersprofile", "logbook":true, "cache":"\\iAdmin\\Cache\\usersprofile", "event":"\\iAdmin\\Event\\usersprofile"}
 */
class usersprofile extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $usersid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $profileid;

    /**
     * @Policy {"nullable":true}
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
     * @return \iAdmin\Model\usersprofile
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getUsersid() {
        return $this->usersid;
    }

    /**
     * @param type $usersid
     * @return \iAdmin\Model\usersprofile
     */
    public function setUsersid($usersid) {
        $this->usersid = $usersid;
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
     * @return \iAdmin\Model\usersprofile
     */
    public function setProfileid($profileid) {
        $this->profileid = $profileid;
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
     * @return \iAdmin\Model\usersprofile
     */
    public function setExpireto($expireto) {
        $this->expireto = $expireto;
        return $this;
    }

}