<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"users", "logbook":true, "cache":"\\iAdmin\\Cache\\users", "event":"\\iAdmin\\Event\\users"}
 */
class users extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $username;

    /**
     * @Policy {"nullable":true, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $password;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"binary2base64,filedata"}
     */
    private $filedata;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $fileinfo;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":"1"}
     */
    private $isactive;

    /**
     * @Policy {"nullable":false, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $fullname;

    /**
     * @Policy {"nullable":false, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $mainmail;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"date", "policy":true, "logallow":true, "default":""}
     */
    private $birthdate;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":"1"}
     */
    private $notifyuser;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\users
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type string
     */
    public function getUsername() {
        return $this->username;
    }

    /**
     * @param type $username
     * @return \iAdmin\Model\users
     */
    public function setUsername($username) {
        $this->username = $username;
        return $this;
    }

    /**
     * @return type string
     */
    public function getPassword() {
        return $this->password;
    }

    /**
     * @param type $password
     * @return \iAdmin\Model\users
     */
    public function setPassword($password) {
        $this->password = $password;
        return $this;
    }

    /**
     * @return type string
     */
    public function getFiledata() {
        return $this->filedata;
    }

    /**
     * @param type $filedata
     * @return \iAdmin\Model\users
     */
    public function setFiledata($filedata) {
        $this->filedata = $filedata;
        return $this;
    }

    /**
     * @return type string
     */
    public function getFileinfo() {
        return $this->fileinfo;
    }

    /**
     * @param type $fileinfo
     * @return \iAdmin\Model\users
     */
    public function setFileinfo($fileinfo) {
        $this->fileinfo = $fileinfo;
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
     * @return \iAdmin\Model\users
     */
    public function setIsactive($isactive) {
        $this->isactive = $isactive;
        return $this;
    }

    /**
     * @return type string
     */
    public function getFullname() {
        return $this->fullname;
    }

    /**
     * @param type $fullname
     * @return \iAdmin\Model\users
     */
    public function setFullname($fullname) {
        $this->fullname = $fullname;
        return $this;
    }

    /**
     * @return type string
     */
    public function getMainmail() {
        return $this->mainmail;
    }

    /**
     * @param type $mainmail
     * @return \iAdmin\Model\users
     */
    public function setMainmail($mainmail) {
        $this->mainmail = $mainmail;
        return $this;
    }

    /**
     * @return type date
     */
    public function getBirthdate() {
        return $this->birthdate;
    }

    /**
     * @param type $birthdate
     * @return \iAdmin\Model\users
     */
    public function setBirthdate($birthdate) {
        $this->birthdate = $birthdate;
        return $this;
    }

    /**
     * @return type boolean
     */
    public function getNotifyuser() {
        return $this->notifyuser;
    }

    /**
     * @param type $notifyuser
     * @return \iAdmin\Model\users
     */
    public function setNotifyuser($notifyuser) {
        $this->notifyuser = $notifyuser;
        return $this;
    }

}