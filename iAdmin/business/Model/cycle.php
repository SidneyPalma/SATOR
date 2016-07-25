<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"cycle", "logbook":true, "cache":"\\iAdmin\\Cache\\cycle", "event":"\\iAdmin\\Event\\cycle"}
 */
class cycle extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "length":40}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $name;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $description;

    /**
     * @Policy {"nullable":false, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $duration;

    /**
     * @Policy {"nullable":false, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $temperature;

    /**
     * @Policy {"nullable":false, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $timetoopen;

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
     * @return \iAdmin\Model\cycle
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
     * @return \iAdmin\Model\cycle
     */
    public function setName($name) {
        $this->name = $name;
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
     * @return \iAdmin\Model\cycle
     */
    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }

    /**
     * @return type string
     */
    public function getDuration() {
        return $this->duration;
    }

    /**
     * @param type $duration
     * @return \iAdmin\Model\cycle
     */
    public function setDuration($duration) {
        $this->duration = $duration;
        return $this;
    }

    /**
     * @return type string
     */
    public function getTemperature() {
        return $this->temperature;
    }

    /**
     * @param type $temperature
     * @return \iAdmin\Model\cycle
     */
    public function setTemperature($temperature) {
        $this->temperature = $temperature;
        return $this;
    }

    /**
     * @return type string
     */
    public function getTimetoopen() {
        return $this->timetoopen;
    }

    /**
     * @param type $timetoopen
     * @return \iAdmin\Model\cycle
     */
    public function setTimetoopen($timetoopen) {
        $this->timetoopen = $timetoopen;
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
     * @return \iAdmin\Model\cycle
     */
    public function setIsactive($isactive) {
        $this->isactive = $isactive;
        return $this;
    }
}