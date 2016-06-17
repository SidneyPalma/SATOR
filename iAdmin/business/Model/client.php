<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"client", "logbook":true, "cache":"\\iAdmin\\Cache\\client", "event":"\\iAdmin\\Event\\client"}
 */
class client extends \Smart\Data\Model {

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
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $code;

    /**
     * @Policy {"nullable":false, "length":3}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $clienttype;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getEnumSearch,clienttype"}
     */
    private $clienttypedescription;

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
     * @return \iAdmin\Model\client
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
     * @return \iAdmin\Model\client
     */
    public function setName($name) {
        $this->name = $name;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getCode() {
        return $this->code;
    }

    /**
     * @param type $code
     * @return \iAdmin\Model\client
     */
    public function setCode($code) {
        $this->code = $code;
        return $this;
    }

    /**
     * @return type string
     */
    public function getClienttype() {
        return $this->clienttype;
    }

    /**
     * @param type $clienttype
     * @return \iAdmin\Model\client
     */
    public function setClienttype($clienttype) {
        $this->clienttype = $clienttype;
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
     * @return \iAdmin\Model\client
     */
    public function setIsactive($isactive) {
        $this->isactive = $isactive;
        return $this;
    }

}