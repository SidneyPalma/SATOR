<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"menu", "logbook":true, "cache":"\\iAdmin\\Cache\\menu", "event":"\\iAdmin\\Event\\menu"}
 */
class menu extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "length":60}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $name;

    /**
     * @Policy {"nullable":false, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $description;

    /**
     * @Policy {"nullable":false, "length":60}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $router;

    /**
     * @Policy {"nullable":false, "length":30}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $glyph;

    /**
     * @Policy {"nullable":false, "length":30}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $available;

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
     * @return \iAdmin\Model\menu
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
     * @return \iAdmin\Model\menu
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
     * @return \iAdmin\Model\menu
     */
    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }

    /**
     * @return type string
     */
    public function getRouter() {
        return $this->router;
    }

    /**
     * @param type $router
     * @return \iAdmin\Model\menu
     */
    public function setRouter($router) {
        $this->router = $router;
        return $this;
    }

    /**
     * @return type string
     */
    public function getGlyph() {
        return $this->glyph;
    }

    /**
     * @param type $glyph
     * @return \iAdmin\Model\menu
     */
    public function setGlyph($glyph) {
        $this->glyph = $glyph;
        return $this;
    }

    /**
     * @return type string
     */
    public function getAvailable() {
        return $this->available;
    }

    /**
     * @param type $available
     * @return \iAdmin\Model\menu
     */
    public function setAvailable($available) {
        $this->available = $available;
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
     * @return \iAdmin\Model\menu
     */
    public function setIsactive($isactive) {
        $this->isactive = $isactive;
        return $this;
    }

}