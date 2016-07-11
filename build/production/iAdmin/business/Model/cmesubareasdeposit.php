<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"cmesubareasdeposit", "logbook":true, "cache":"\\iAdmin\\Cache\\cmesubareasdeposit", "event":"\\iAdmin\\Event\\cmesubareasdeposit"}
 */
class cmesubareasdeposit extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $cmesubareasid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getNameSearch,cmesubareasid"}
     */
    private $cmesubareasname;

    /**
     * @Policy {"nullable":false, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $name;

    /**
     * @Policy {"nullable":false, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $barcode;

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
     * @return \iAdmin\Model\cmesubareasdeposit
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getCmesubareasid() {
        return $this->cmesubareasid;
    }

    /**
     * @param type $cmesubareasid
     * @return \iAdmin\Model\cmesubareasdeposit
     */
    public function setCmesubareasid($cmesubareasid) {
        $this->cmesubareasid = $cmesubareasid;
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
     * @return \iAdmin\Model\cmesubareasdeposit
     */
    public function setName($name) {
        $this->name = $name;
        return $this;
    }

    /**
     * @return type string
     */
    public function getBarcode() {
        return $this->barcode;
    }

    /**
     * @param type $barcode
     * @return \iAdmin\Model\cmesubareasdeposit
     */
    public function setBarcode($barcode) {
        $this->barcode = $barcode;
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
     * @return \iAdmin\Model\cmesubareasdeposit
     */
    public function setIsactive($isactive) {
        $this->isactive = $isactive;
        return $this;
    }

}