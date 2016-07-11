<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"movimentitem", "logbook":true, "cache":"\\iAdmin\\Cache\\movimentitem", "event":"\\iAdmin\\Event\\movimentitem"}
 */
class movimentitem extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $movimentid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $inputid;

    /**
     * @Policy {"nullable":false, "length":3}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $presentation;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $quantity;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"date", "policy":true, "logallow":true, "default":""}
     */
    private $datevalidity;

    /**
     * @Policy {"nullable":false, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $lotpart;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\movimentitem
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getMovimentid() {
        return $this->movimentid;
    }

    /**
     * @param type $movimentid
     * @return \iAdmin\Model\movimentitem
     */
    public function setMovimentid($movimentid) {
        $this->movimentid = $movimentid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getInputid() {
        return $this->inputid;
    }

    /**
     * @param type $inputid
     * @return \iAdmin\Model\movimentitem
     */
    public function setInputid($inputid) {
        $this->inputid = $inputid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getPresentation() {
        return $this->presentation;
    }

    /**
     * @param type $presentation
     * @return \iAdmin\Model\movimentitem
     */
    public function setPresentation($presentation) {
        $this->presentation = $presentation;
        return $this;
    }

    /**
     * @return type string
     */
    public function getQuantity() {
        return $this->quantity;
    }

    /**
     * @param type $quantity
     * @return \iAdmin\Model\movimentitem
     */
    public function setQuantity($quantity) {
        $this->quantity = $quantity;
        return $this;
    }

    /**
     * @return type date
     */
    public function getDatevalidity() {
        return $this->datevalidity;
    }

    /**
     * @param type $datevalidity
     * @return \iAdmin\Model\movimentitem
     */
    public function setDatevalidity($datevalidity) {
        $this->datevalidity = $datevalidity;
        return $this;
    }

    /**
     * @return type string
     */
    public function getLotpart() {
        return $this->lotpart;
    }

    /**
     * @param type $lotpart
     * @return \iAdmin\Model\movimentitem
     */
    public function setLotpart($lotpart) {
        $this->lotpart = $lotpart;
        return $this;
    }

}