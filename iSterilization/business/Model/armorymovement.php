<?php

namespace iSterilization\Model;

/**
 * 
 * @Entity {"name":"armorymovement", "logbook":true, "cache":"\\iSterilization\\Cache\\armorymovement", "event":"\\iSterilization\\Event\\armorymovement"}
 */
class armorymovement extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $areasid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getNameSearch,areasid,areas"}
     */
    private $areasname;

    /**
     * @Policy {"nullable":false, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $movementuser;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"date", "policy":true, "logallow":true, "default":""}
     */
    private $movementdate;

    /**
     * @Policy {"nullable":false, "length":3}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $movementtype;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getEnumSearch,movementtype"}
     */
    private $movementtypedescription;

    /**
     * @Policy {"nullable":false, "length":1}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $releasestype;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getEnumSearch,releasestype"}
     */
    private $releasestypedescription;

    /**
     * @Policy {"nullable":false, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $closedby;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $closeddate;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iSterilization\Model\armorymovement
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getAreasid() {
        return $this->areasid;
    }

    /**
     * @param type $areasid
     * @return \iSterilization\Model\armorymovement
     */
    public function setAreasid($areasid) {
        $this->areasid = $areasid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getMovementuser() {
        return $this->movementuser;
    }

    /**
     * @param type $movementuser
     * @return \iSterilization\Model\armorymovement
     */
    public function setMovementuser($movementuser) {
        $this->movementuser = $movementuser;
        return $this;
    }

    /**
     * @return type string
     */
    public function getMovementdate() {
        return $this->movementdate;
    }

    /**
     * @param type $movementdate
     * @return \iSterilization\Model\armorymovement
     */
    public function setMovementdate($movementdate) {
        $this->movementdate = $movementdate;
        return $this;
    }

    /**
     * @return type string
     */
    public function getMovementtype() {
        return $this->movementtype;
    }

    /**
     * @param type $movementtype
     * @return \iSterilization\Model\armorymovement
     */
    public function setMovementtype($movementtype) {
        $this->movementtype = $movementtype;
        return $this;
    }

    /**
     * @return type string
     */
    public function getReleasestype() {
        return $this->releasestype;
    }

    /**
     * @param type $releasestype
     * @return \iSterilization\Model\armorymovement
     */
    public function setReleasestype($releasestype) {
        $this->releasestype = $releasestype;
        return $this;
    }

    /**
     * @return type string
     */
    public function getClosedby() {
        return $this->closedby;
    }

    /**
     * @param type $closedby
     * @return \iSterilization\Model\armorymovement
     */
    public function setClosedby($closedby) {
        $this->closedby = $closedby;
        return $this;
    }

    /**
     * @return type string
     */
    public function getCloseddate() {
        return $this->closeddate;
    }

    /**
     * @param type $closeddate
     * @return \iSterilization\Model\armorymovement
     */
    public function setCloseddate($closeddate) {
        $this->closeddate = $closeddate;
        return $this;
    }

}