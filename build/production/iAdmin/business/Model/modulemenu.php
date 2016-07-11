<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"modulemenu", "logbook":true, "cache":"\\iAdmin\\Cache\\modulemenu", "event":"\\iAdmin\\Event\\modulemenu"}
 */
class modulemenu extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $parentid;

    /**
     * @Policy {"nullable":true, "length":30}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $glyph;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $moduleid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $menuid;

    /**
     * @Policy {"nullable":true, "length":50}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $name;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":"0.00"}
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
     * @return \iAdmin\Model\modulemenu
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getParentid() {
        return $this->parentid;
    }

    /**
     * @param type $parentid
     * @return \iAdmin\Model\modulemenu
     */
    public function setParentid($parentid) {
        $this->parentid = $parentid;
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
     * @return \iAdmin\Model\modulemenu
     */
    public function setGlyph($glyph) {
        $this->glyph = $glyph;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getModuleid() {
        return $this->moduleid;
    }

    /**
     * @param type $moduleid
     * @return \iAdmin\Model\modulemenu
     */
    public function setModuleid($moduleid) {
        $this->moduleid = $moduleid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getMenuid() {
        return $this->menuid;
    }

    /**
     * @param type $menuid
     * @return \iAdmin\Model\modulemenu
     */
    public function setMenuid($menuid) {
        $this->menuid = $menuid;
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
     * @return \iAdmin\Model\modulemenu
     */
    public function setName($name) {
        $this->name = $name;
        return $this;
    }

    /**
     * @return type string
     */
    public function getOrderby() {
        return $this->orderby;
    }

    /**
     * @param type $orderby
     * @return \iAdmin\Model\modulemenu
     */
    public function setOrderby($orderby) {
        $this->orderby = $orderby;
        return $this;
    }

}