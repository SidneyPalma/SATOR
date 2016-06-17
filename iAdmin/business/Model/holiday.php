<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"holiday", "logbook":true, "cache":"\\iAdmin\\Cache\\holiday", "event":"\\iAdmin\\Event\\holiday"}
 */
class holiday extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $description;

    /**
     * @Policy {"nullable":false, "length":1}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $holidaytype;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"date", "policy":true, "logallow":true, "default":""}
     */
    private $holidaydate;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":""}
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
     * @return \iAdmin\Model\holiday
     */
    public function setId($id) {
        $this->id = $id;
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
     * @return \iAdmin\Model\holiday
     */
    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }

    /**
     * @return type string
     */
    public function getHolidaytype() {
        return $this->holidaytype;
    }

    /**
     * @param type $holidaytype
     * @return \iAdmin\Model\holiday
     */
    public function setHolidaytype($holidaytype) {
        $this->holidaytype = $holidaytype;
        return $this;
    }

    /**
     * @return type date
     */
    public function getHolidaydate() {
        return $this->holidaydate;
    }

    /**
     * @param type $holidaydate
     * @return \iAdmin\Model\holiday
     */
    public function setHolidaydate($holidaydate) {
        $this->holidaydate = $holidaydate;
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
     * @return \iAdmin\Model\holiday
     */
    public function setIsactive($isactive) {
        $this->isactive = $isactive;
        return $this;
    }

}