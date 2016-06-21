<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"collaborator", "logbook":true, "cache":"\\iAdmin\\Cache\\collaborator", "event":"\\iAdmin\\Event\\collaborator"}
 */
class collaborator extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "length":60}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $name;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $registration;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"date", "policy":true, "logallow":true, "default":""}
     */
    private $dateadmission;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"date", "policy":true, "logallow":true, "default":""}
     */
    private $dateresignation;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $classcouncilid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getNameSearch,classcouncilid"}
     */
    private $classcouncilname;

    /**
     * @Policy {"nullable":true, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $classcouncilcode;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $usersid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getUserSearch,usersid"}
     */
    private $username;

    /**
     * @Policy {"nullable":false, "length":2}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $federationunit;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getEnumSearch,federationunit"}
     */
    private $federationunitdescription;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":"1"}
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
     * @return \iAdmin\Model\collaborator
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
     * @return \iAdmin\Model\collaborator
     */
    public function setName($name) {
        $this->name = $name;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getRegistration() {
        return $this->registration;
    }

    /**
     * @param type $registration
     * @return \iAdmin\Model\collaborator
     */
    public function setRegistration($registration) {
        $this->registration = $registration;
        return $this;
    }

    /**
     * @return type date
     */
    public function getDateadmission() {
        return $this->dateadmission;
    }

    /**
     * @param type $dateadmission
     * @return \iAdmin\Model\collaborator
     */
    public function setDateadmission($dateadmission) {
        $this->dateadmission = $dateadmission;
        return $this;
    }

    /**
     * @return type date
     */
    public function getDateresignation() {
        return $this->dateresignation;
    }

    /**
     * @param type $dateresignation
     * @return \iAdmin\Model\collaborator
     */
    public function setDateresignation($dateresignation) {
        $this->dateresignation = $dateresignation;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getClasscouncilid() {
        return $this->classcouncilid;
    }

    /**
     * @param type $classcouncilid
     * @return \iAdmin\Model\collaborator
     */
    public function setClasscouncilid($classcouncilid) {
        $this->classcouncilid = $classcouncilid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getClasscouncilcode() {
        return $this->classcouncilcode;
    }

    /**
     * @param type $classcouncilcode
     * @return \iAdmin\Model\collaborator
     */
    public function setClasscouncilcode($classcouncilcode) {
        $this->classcouncilcode = $classcouncilcode;
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
     * @return \iAdmin\Model\collaborator
     */
    public function setUsersid($usersid) {
        $this->usersid = $usersid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getFederationunit() {
        return $this->federationunit;
    }

    /**
     * @param type $federationunit
     * @return \iAdmin\Model\collaborator
     */
    public function setFederationunit($federationunit) {
        $this->federationunit = $federationunit;
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
     * @return \iAdmin\Model\collaborator
     */
    public function setIsactive($isactive) {
        $this->isactive = $isactive;
        return $this;
    }

}