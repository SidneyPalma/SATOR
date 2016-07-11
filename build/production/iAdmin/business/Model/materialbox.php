<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"materialbox", "logbook":true, "cache":"\\iAdmin\\Cache\\materialbox", "event":"\\iAdmin\\Event\\materialbox"}
 */
class materialbox extends \Smart\Data\Model {

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
     * @Policy {"nullable":false, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $barcode;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $restriction;

    /**
     * @Policy {"nullable":false, "length":3}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $itemsize;

	/**
	 * @Policy {"nullable":true}
	 * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getEnumSearch,itemsize"}
	 */
	private $itemsizedescription;

    /**
     * @Policy {"nullable":false, "length":3}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":"000"}
     */
    private $statusbox;

	/**
	 * @Policy {"nullable":true}
	 * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getEnumSearch,statusbox"}
	 */
	private $statusboxdescription;
	
    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $packingid;
	
	/**
	 * @Policy {"nullable":true}
	 * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getNameSearch,packingid"}
	 */
	private $packingname;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":""}
     */
    private $requirepatient;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\materialbox
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
     * @return \iAdmin\Model\materialbox
     */
    public function setName($name) {
        $this->name = $name;
        return $this;
    }

    /**
     * @return type string
     */
    public function getBarcode() {
        return $this->barcode;
    }

    /**
     * @param type $barcode
     * @return \iAdmin\Model\materialbox
     */
    public function setBarcode($barcode) {
        $this->barcode = $barcode;
        return $this;
    }

    /**
     * @return type string
     */
    public function getRestriction() {
        return $this->restriction;
    }

    /**
     * @param type $restriction
     * @return \iAdmin\Model\materialbox
     */
    public function setRestriction($restriction) {
        $this->restriction = $restriction;
        return $this;
    }

    /**
     * @return type string
     */
    public function getItemsize() {
        return $this->itemsize;
    }

    /**
     * @param type $itemsize
     * @return \iAdmin\Model\materialbox
     */
    public function setItemsize($itemsize) {
        $this->itemsize = $itemsize;
        return $this;
    }

    /**
     * @return type string
     */
    public function getStatusbox() {
        return $this->statusbox;
    }

    /**
     * @param type $statusbox
     * @return \iAdmin\Model\materialbox
     */
    public function setStatusbox($statusbox) {
        $this->statusbox = $statusbox;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getPackingid() {
        return $this->packingid;
    }

    /**
     * @param type $packingid
     * @return \iAdmin\Model\materialbox
     */
    public function setPackingid($packingid) {
        $this->packingid = $packingid;
        return $this;
    }

    /**
     * @return type boolean
     */
    public function getRequirepatient() {
        return $this->requirepatient;
    }

    /**
     * @param type $requirepatient
     * @return \iAdmin\Model\materialbox
     */
    public function setRequirepatient($requirepatient) {
        $this->requirepatient = $requirepatient;
        return $this;
    }

}