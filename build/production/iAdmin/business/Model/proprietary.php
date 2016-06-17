<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"proprietary", "logbook":true, "cache":"\\iAdmin\\Cache\\proprietary", "event":"\\iAdmin\\Event\\proprietary"}
 */
class proprietary extends \Smart\Data\Model {

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
     * @Policy {"nullable":false, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $contactsphone;

    /**
     * @Policy {"nullable":false, "length":60}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $contactperson;

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
     * @return \iAdmin\Model\proprietary
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
     * @return \iAdmin\Model\proprietary
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
     * @return \iAdmin\Model\proprietary
     */
    public function setBarcode($barcode) {
        $this->barcode = $barcode;
        return $this;
    }

    /**
     * @return type string
     */
    public function getContactsphone() {
        return $this->contactsphone;
    }

    /**
     * @param type $contactsphone
     * @return \iAdmin\Model\proprietary
     */
    public function setContactsphone($contactsphone) {
        $this->contactsphone = $contactsphone;
        return $this;
    }

    /**
     * @return type string
     */
    public function getContactperson() {
        return $this->contactperson;
    }

    /**
     * @param type $contactperson
     * @return \iAdmin\Model\proprietary
     */
    public function setContactperson($contactperson) {
        $this->contactperson = $contactperson;
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
     * @return \iAdmin\Model\proprietary
     */
    public function setIsactive($isactive) {
        $this->isactive = $isactive;
        return $this;
    }

}