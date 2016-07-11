<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"packing", "logbook":true, "cache":"\\iAdmin\\Cache\\packing", "event":"\\iAdmin\\Event\\packing"}
 */
class packing extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "length":50}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $name;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":"1"}
     */
    private $isactive;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":"1"}
     */
    private $validitydays;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\packing
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
     * @return \iAdmin\Model\packing
     */
    public function setName($name) {
        $this->name = $name;
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
     * @return \iAdmin\Model\packing
     */
    public function setIsactive($isactive) {
        $this->isactive = $isactive;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getValiditydays() {
        return $this->validitydays;
    }

    /**
     * @param type $validitydays
     * @return \iAdmin\Model\packing
     */
    public function setValiditydays($validitydays) {
        $this->validitydays = $validitydays;
        return $this;
    }

}