<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"entity", "logbook":true, "cache":"\\iAdmin\\Cache\\entity", "event":"\\iAdmin\\Event\\entity"}
 */
class entity extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $name;

    /**
     * @Policy {"nullable":false, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $legalname;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $collaboratorid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getNameSearch,collaboratorid"}
     */
    private $collaboratorname;

    /**
     * @Policy {"nullable":false, "length":14}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $cnpjnumber;

    /**
     * @Policy {"nullable":false, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $cnesnumber;

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
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\entity
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type string
     */
    public function getName() {
        return $this->name;
    }

    /**
     * @param type $name
     * @return \iAdmin\Model\entity
     */
    public function setName($name) {
        $this->name = $name;
        return $this;
    }

    /**
     * @return type string
     */
    public function getLegalname() {
        return $this->legalname;
    }

    /**
     * @param type $legalname
     * @return \iAdmin\Model\entity
     */
    public function setLegalname($legalname) {
        $this->legalname = $legalname;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getCollaboratorid() {
        return $this->collaboratorid;
    }

    /**
     * @param type $collaboratorid
     * @return \iAdmin\Model\entity
     */
    public function setCollaboratorid($collaboratorid) {
        $this->collaboratorid = $collaboratorid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getCnpjnumber() {
        return $this->cnpjnumber;
    }

    /**
     * @param type $cnpjnumber
     * @return \iAdmin\Model\entity
     */
    public function setCnpjnumber($cnpjnumber) {
        $this->cnpjnumber = $cnpjnumber;
        return $this;
    }

    /**
     * @return type string
     */
    public function getCnesnumber() {
        return $this->cnesnumber;
    }

    /**
     * @param type $cnesnumber
     * @return \iAdmin\Model\entity
     */
    public function setCnesnumber($cnesnumber) {
        $this->cnesnumber = $cnesnumber;
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
     * @return \iAdmin\Model\entity
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
     * @return \iAdmin\Model\entity
     */
    public function setFileinfo($fileinfo) {
        $this->fileinfo = $fileinfo;
        return $this;
    }

}