<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"moviment", "logbook":true, "cache":"\\iAdmin\\Cache\\moviment", "event":"\\iAdmin\\Event\\moviment"}
 */
class moviment extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"date", "policy":true, "logallow":true, "default":"getdate()"}
     */
    private $movimentdate;

    /**
     * @Policy {"nullable":false, "length":80}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $username;

    /**
     * @Policy {"nullable":false, "length":1}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $movimenttype;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getEnumSearch,movimenttype"}
     */
    private $movimenttypedescription;

    /**
     * @Policy {"nullable":false, "length":20}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $documentnumber;

    /**
     * @Policy {"nullable":false, "length":1}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $documenttype;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getEnumSearch,documenttype"}
     */
    private $documenttypedescription;

    /**
     * @Policy {"nullable":false, "length":1}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":"L"}
     */
    private $movimentstatus;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getEnumSearch,movimentstatus"}
     */
    private $movimentstatusdescription;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\moviment
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type date
     */
    public function getMovimentdate() {
        return $this->movimentdate;
    }

    /**
     * @param type $movimentdate
     * @return \iAdmin\Model\moviment
     */
    public function setMovimentdate($movimentdate) {
        $this->movimentdate = $movimentdate;
        return $this;
    }

    /**
     * @return type string
     */
    public function getUsername() {
        return $this->username;
    }

    /**
     * @param type $username
     * @return \iAdmin\Model\moviment
     */
    public function setUsername($username) {
        $this->username = $username;
        return $this;
    }

    /**
     * @return type string
     */
    public function getMovimenttype() {
        return $this->movimenttype;
    }

    /**
     * @param type $movimenttype
     * @return \iAdmin\Model\moviment
     */
    public function setMovimenttype($movimenttype) {
        $this->movimenttype = $movimenttype;
        return $this;
    }

    /**
     * @return type string
     */
    public function getDocumentnumber() {
        return $this->documentnumber;
    }

    /**
     * @param type $documentnumber
     * @return \iAdmin\Model\moviment
     */
    public function setDocumentnumber($documentnumber) {
        $this->documentnumber = $documentnumber;
        return $this;
    }

    /**
     * @return type string
     */
    public function getDocumenttype() {
        return $this->documenttype;
    }

    /**
     * @param type $documenttype
     * @return \iAdmin\Model\moviment
     */
    public function setDocumenttype($documenttype) {
        $this->documenttype = $documenttype;
        return $this;
    }

    /**
     * @return type string
     */
    public function getMovimentstatus() {
        return $this->movimentstatus;
    }

    /**
     * @param type $movimentstatus
     * @return \iAdmin\Model\moviment
     */
    public function setMovimentstatus($movimentstatus) {
        $this->movimentstatus = $movimentstatus;
        return $this;
    }

}