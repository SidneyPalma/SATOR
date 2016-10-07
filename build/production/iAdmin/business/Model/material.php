<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"material", "logbook":true, "cache":"\\iAdmin\\Cache\\material", "event":"\\iAdmin\\Event\\material"}
 */
class material extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"NONE", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $materialstatus;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getEnumSearch,materialstatus"}
     */
    private $materialstatusdescription;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $packingid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getNameSearch,packingid"}
     */
    private $packingname;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $numberproceedings;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"date", "policy":true, "logallow":true, "default":""}
     */
    private $datedisposal;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":""}
     */
    private $isconsigned;

    /**
     * @Policy {"nullable":true, "length":3}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $itemsize;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getEnumSearch,itemsize"}
     */
    private $itemsizedescription;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $itemlength;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $itemcubiclength;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":""}
     */
    private $cloned;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"date", "policy":true, "logallow":true, "default":""}
     */
    private $clonedate;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $cloneusername;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\material
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type string
     */
    public function getMaterialstatus() {
        return $this->materialstatus;
    }

    /**
     * @param type $materialstatus
     * @return \iAdmin\Model\material
     */
    public function setMaterialstatus($materialstatus) {
        $this->materialstatus = $materialstatus;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getPackingid() {
        return $this->packingid;
    }

    /**
     * @param type $packingid
     * @return \iAdmin\Model\material
     */
    public function setPackingid($packingid) {
        $this->packingid = $packingid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getNumberproceedings() {
        return $this->numberproceedings;
    }

    /**
     * @param type $numberproceedings
     * @return \iAdmin\Model\material
     */
    public function setNumberproceedings($numberproceedings) {
        $this->numberproceedings = $numberproceedings;
        return $this;
    }

    /**
     * @return type date
     */
    public function getDatedisposal() {
        return $this->datedisposal;
    }

    /**
     * @param type $datedisposal
     * @return \iAdmin\Model\material
     */
    public function setDatedisposal($datedisposal) {
        $this->datedisposal = $datedisposal;
        return $this;
    }
    /**
     * @return type boolean
     */
    public function getIsconsigned() {
        return $this->isconsigned;
    }

    /**
     * @param type $isconsigned
     * @return \iAdmin\Model\material
     */
    public function setIsconsigned($isconsigned) {
        $this->isconsigned = $isconsigned;
        return $this;
    }

    /**
     * @return type string
     */
    public function getItemsize() {
        return $this->itemsize;
    }

    /**
     * @param type $itemsize
     * @return \iAdmin\Model\material
     */
    public function setItemsize($itemsize) {
        $this->itemsize = $itemsize;
        return $this;
    }

    /**
     * @return type string
     */
    public function getItemlength() {
        return $this->itemlength;
    }

    /**
     * @param type $itemlength
     * @return \iAdmin\Model\material
     */
    public function setItemlength($itemlength) {
        $this->itemlength = $itemlength;
        return $this;
    }

    /**
     * @return type string
     */
    public function getItemcubiclength() {
        return $this->itemcubiclength;
    }

    /**
     * @param type $itemcubiclength
     * @return \iAdmin\Model\material
     */
    public function setItemcubiclength($itemcubiclength) {
        $this->itemcubiclength = $itemcubiclength;
        return $this;
    }

    /**
     * @return type boolean
     */
    public function getCloned() {
        return $this->cloned;
    }

    /**
     * @param type $cloned
     * @return \iAdmin\Model\material
     */
    public function setCloned($cloned) {
        $this->cloned = $cloned;
        return $this;
    }

    /**
     * @return type date
     */
    public function getClonedate() {
        return $this->clonedate;
    }

    /**
     * @param type $clonedate
     * @return \iAdmin\Model\material
     */
    public function setClonedate($clonedate) {
        $this->clonedate = $clonedate;
        return $this;
    }

    /**
     * @return type string
     */
    public function getCloneusername() {
        return $this->cloneusername;
    }

    /**
     * @param type $cloneusername
     * @return \iAdmin\Model\material
     */
    public function setCloneusername($cloneusername) {
        $this->cloneusername = $cloneusername;
        return $this;
    }

}