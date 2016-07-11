<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"menuaction", "logbook":true, "cache":"\\iAdmin\\Cache\\menuaction", "event":"\\iAdmin\\Event\\menuaction"}
 */
class menuaction extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $menuid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $actionid;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\menuaction
     */
    public function setId($id) {
        $this->id = $id;
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
     * @return \iAdmin\Model\menuaction
     */
    public function setMenuid($menuid) {
        $this->menuid = $menuid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getActionid() {
        return $this->actionid;
    }

    /**
     * @param type $actionid
     * @return \iAdmin\Model\menuaction
     */
    public function setActionid($actionid) {
        $this->actionid = $actionid;
        return $this;
    }

}