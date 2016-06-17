<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"enumtypelist", "logbook":true, "cache":"\\iAdmin\\Cache\\enumtypelist", "event":"\\iAdmin\\Event\\enumtypelist"}
 */
class enumtypelist extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $enumtypeid;

    /**
     * @Policy {"nullable":false, "length":50}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $code;

    /**
     * @Policy {"nullable":false, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $description;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $observation;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":"0"}
     */
    private $isactive;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":"0"}
     */
    private $orderby;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\enumtypelist
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getEnumtypeid() {
        return $this->enumtypeid;
    }

    /**
     * @param type $enumtypeid
     * @return \iAdmin\Model\enumtypelist
     */
    public function setEnumtypeid($enumtypeid) {
        $this->enumtypeid = $enumtypeid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getCode() {
        return $this->code;
    }

    /**
     * @param type $code
     * @return \iAdmin\Model\enumtypelist
     */
    public function setCode($code) {
        $this->code = $code;
        return $this;
    }

    /**
     * @return type string
     */
    public function getDescription() {
        return $this->description;
    }

    /**
     * @param type $description
     * @return \iAdmin\Model\enumtypelist
     */
    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }

    /**
     * @return type string
     */
    public function getObservation() {
        return $this->observation;
    }

    /**
     * @param type $observation
     * @return \iAdmin\Model\enumtypelist
     */
    public function setObservation($observation) {
        $this->observation = $observation;
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
     * @return \iAdmin\Model\enumtypelist
     */
    public function setIsactive($isactive) {
        $this->isactive = $isactive;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getOrderby() {
        return $this->orderby;
    }

    /**
     * @param type $orderby
     * @return \iAdmin\Model\enumtypelist
     */
    public function setOrderby($orderby) {
        $this->orderby = $orderby;
        return $this;
    }

}