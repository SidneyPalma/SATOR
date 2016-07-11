<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"classcouncil", "logbook":true, "cache":"\\iAdmin\\Cache\\classcouncil", "event":"\\iAdmin\\Event\\classcouncil"}
 */
class classcouncil extends \Smart\Data\Model {

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
     * @Policy {"nullable":false, "length":7}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $cnes;

    /**
     * @Policy {"nullable":false, "length":60}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $acronym;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\classcouncil
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
     * @return \iAdmin\Model\classcouncil
     */
    public function setName($name) {
        $this->name = $name;
        return $this;
    }

    /**
     * @return type string
     */
    public function getCnes() {
        return $this->cnes;
    }

    /**
     * @param type $cnes
     * @return \iAdmin\Model\classcouncil
     */
    public function setCnes($cnes) {
        $this->cnes = $cnes;
        return $this;
    }

    /**
     * @return type string
     */
    public function getAcronym() {
        return $this->acronym;
    }

    /**
     * @param type $acronym
     * @return \iAdmin\Model\classcouncil
     */
    public function setAcronym($acronym) {
        $this->acronym = $acronym;
        return $this;
    }

}