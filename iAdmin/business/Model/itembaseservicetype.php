<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"itembaseservicetype", "logbook":true, "cache":"\\iAdmin\\Cache\\itembaseservicetype", "event":"\\iAdmin\\Event\\itembaseservicetype"}
 */
class itembaseservicetype extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $itembaseid;

    /**
     * @Policy {"nullable":false, "length":3}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $servicetype;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\itembaseservicetype
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getItembaseid() {
        return $this->itembaseid;
    }

    /**
     * @param type $itembaseid
     * @return \iAdmin\Model\itembaseservicetype
     */
    public function setItembaseid($itembaseid) {
        $this->itembaseid = $itembaseid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getServicetype() {
        return $this->servicetype;
    }

    /**
     * @param type $servicetype
     * @return \iAdmin\Model\itembaseservicetype
     */
    public function setServicetype($servicetype) {
        $this->servicetype = $servicetype;
        return $this;
    }

}