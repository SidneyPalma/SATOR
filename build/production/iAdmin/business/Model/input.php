<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"input", "logbook":true, "cache":"\\iAdmin\\Cache\\input", "event":"\\iAdmin\\Event\\input"}
 */
class input extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $presentation;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getEnumSearch,presentation"}
     */
    private $presentationdescription;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $manufacturerid;

	/**
	 * @Policy {"nullable":true}
	 * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getNameSearch,manufacturerid"}
	 */
	private $manufacturername;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $providerid;
	
	/**
	 * @Policy {"nullable":true}
	 * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getNameSearch,providerid"}
	 */
	private $providername;	

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":""}
     */
    private $hasbatch;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":"1"}
     */
    private $hasstock;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":""}
     */
    private $reactive;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $minstock;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $maxstock;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $resetpoint;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $deadline;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $validityactivation;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\input
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type string
     */
    public function getPresentation() {
        return $this->presentation;
    }

    /**
     * @param type $presentation
     * @return \iAdmin\Model\input
     */
    public function setPresentation($presentation) {
        $this->presentation = $presentation;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getProviderid() {
        return $this->providerid;
    }

    /**
     * @param type $providerid
     * @return \iAdmin\Model\input
     */
    public function setProviderid($providerid) {
        $this->providerid = $providerid;
        return $this;
    }

    /**
     * @return type boolean
     */
    public function getHasbatch() {
        return $this->hasbatch;
    }

    /**
     * @param type $hasbatch
     * @return \iAdmin\Model\input
     */
    public function setHasbatch($hasbatch) {
        $this->hasbatch = $hasbatch;
        return $this;
    }

    /**
     * @return type boolean
     */
    public function getHasstock() {
        return $this->hasstock;
    }

    /**
     * @param type $hasstock
     * @return \iAdmin\Model\input
     */
    public function setHasstock($hasstock) {
        $this->hasstock = $hasstock;
        return $this;
    }

    /**
     * @return type boolean
     */
    public function getReactive() {
        return $this->reactive;
    }

    /**
     * @param type $reactive
     * @return \iAdmin\Model\input
     */
    public function setReactive($reactive) {
        $this->reactive = $reactive;
        return $this;
    }

    /**
     * @return type string
     */
    public function getMinstock() {
        return $this->minstock;
    }

    /**
     * @param type $minstock
     * @return \iAdmin\Model\input
     */
    public function setMinstock($minstock) {
        $this->minstock = $minstock;
        return $this;
    }

    /**
     * @return type string
     */
    public function getMaxstock() {
        return $this->maxstock;
    }

    /**
     * @param type $maxstock
     * @return \iAdmin\Model\input
     */
    public function setMaxstock($maxstock) {
        $this->maxstock = $maxstock;
        return $this;
    }

    /**
     * @return type string
     */
    public function getResetpoint() {
        return $this->resetpoint;
    }

    /**
     * @param type $resetpoint
     * @return \iAdmin\Model\input
     */
    public function setResetpoint($resetpoint) {
        $this->resetpoint = $resetpoint;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getDeadline() {
        return $this->deadline;
    }

    /**
     * @param type $deadline
     * @return \iAdmin\Model\input
     */
    public function setDeadline($deadline) {
        $this->deadline = $deadline;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getValidityactivation() {
        return $this->validityactivation;
    }

    /**
     * @param type $validityactivation
     * @return \iAdmin\Model\input
     */
    public function setValidityactivation($validityactivation) {
        $this->validityactivation = $validityactivation;
        return $this;
    }

}