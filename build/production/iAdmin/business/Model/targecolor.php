<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"targecolor", "logbook":true, "cache":"\\iAdmin\\Cache\\targecolor", "event":"\\iAdmin\\Event\\targecolor"}
 */
class targecolor extends \Smart\Data\Model {

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
    private $colorschema;

    /**
     * @Policy {"nullable":false, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $colorstripe;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\targecolor
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
     * @return \iAdmin\Model\targecolor
     */
    public function setName($name) {
        $this->name = $name;
        return $this;
    }

    /**
     * @return type string
     */
    public function getColorschema() {
        return $this->colorschema;
    }

    /**
     * @param type $colorschema
     * @return \iAdmin\Model\targecolor
     */
    public function setColorschema($colorschema) {
        $this->colorschema = $colorschema;
        return $this;
    }

    /**
     * @return type string
     */
    public function getColorstripe() {
        return $this->colorstripe;
    }

    /**
     * @param type $colorstripe
     * @return \iAdmin\Model\targecolor
     */
    public function setColorstripe($colorstripe) {
        $this->colorstripe = $colorstripe;
        return $this;
    }

}