<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"sterilizationtype", "logbook":true, "cache":"\\iAdmin\\Cache\\sterilizationtype", "event":"\\iAdmin\\Event\\sterilizationtype"}
 */
class sterilizationtype extends \Smart\Data\Model {

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
     * @Policy {"nullable":false, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $description;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":"1"}
     */
    private $validdays;

    /**
     * @Policy {"nullable":false, "length":1}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":"'N'"}
     */
    private $prioritylevel;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getEnumSearch,prioritylevel"}
     */
    private $priorityleveldescription;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $graphpaper;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $dataflowrule;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $dataflowstep;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":"1"}
     */
    private $isactive;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"date", "policy":true, "logallow":true, "default":""}
     */
    private $expireto;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\sterilizationtype
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
     * @return \iAdmin\Model\sterilizationtype
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
     * @return \iAdmin\Model\sterilizationtype
     */
    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getValiddays() {
        return $this->validdays;
    }

    /**
     * @param type $validdays
     * @return \iAdmin\Model\sterilizationtype
     */
    public function setValiddays($validdays) {
        $this->validdays = $validdays;
        return $this;
    }

    /**
     * @return type string
     */
    public function getPrioritylevel() {
        return $this->prioritylevel;
    }

    /**
     * @param type $prioritylevel
     * @return \iAdmin\Model\sterilizationtype
     */
    public function setPrioritylevel($prioritylevel) {
        $this->prioritylevel = $prioritylevel;
        return $this;
    }

    /**
     * @return type string
     */
    public function getGraphpaper() {
        return $this->graphpaper;
    }

    /**
     * @param type $graphpaper
     * @return \iAdmin\Model\sterilizationtype
     */
    public function setGraphpaper($graphpaper) {
        $this->graphpaper = $graphpaper;
        return $this;
    }

    /**
     * @return type string
     */
    public function getDataflowrule() {
        return $this->dataflowrule;
    }

    /**
     * @param type $dataflowrule
     * @return \iAdmin\Model\sterilizationtype
     */
    public function setDataflowrule($dataflowrule) {
        $this->dataflowrule = $dataflowrule;
        return $this;
    }

    /**
     * @return type string
     */
    public function getDataflowstep() {
        return $this->dataflowstep;
    }

    /**
     * @param type $dataflowstep
     * @return \iAdmin\Model\sterilizationtype
     */
    public function setDataflowstep($dataflowstep) {
        $this->dataflowstep = $dataflowstep;
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
     * @return \iAdmin\Model\sterilizationtype
     */
    public function setIsactive($isactive) {
        $this->isactive = $isactive;
        return $this;
    }

    /**
     * @return type date
     */
    public function getExpireto() {
        return $this->expireto;
    }

    /**
     * @param type $expireto
     * @return \iAdmin\Model\processtype
     */
    public function setExpireto($expireto) {
        $this->expireto = $expireto;
        return $this;
    }
}