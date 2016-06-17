<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"cmeareas", "logbook":true, "cache":"\\iAdmin\\Cache\\cmeareas", "event":"\\iAdmin\\Event\\cmeareas"}
 */
class cmeareas extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"NONE", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":"1"}
     */
    private $isactive;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
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
     * @return \iAdmin\Model\cmeareas
     */
    public function setId($id) {
        $this->id = $id;
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
     * @return \iAdmin\Model\cmeareas
     */
    public function setIsactive($isactive) {
        $this->isactive = $isactive;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getOrderby() {
        return $this->orderby;
    }

    /**
     * @param type $orderby
     * @return \iAdmin\Model\cmeareas
     */
    public function setOrderby($orderby) {
        $this->orderby = $orderby;
        return $this;
    }

}