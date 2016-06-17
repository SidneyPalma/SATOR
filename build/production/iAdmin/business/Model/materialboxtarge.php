<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"materialboxtarge", "logbook":true, "cache":"\\iAdmin\\Cache\\materialboxtarge", "event":"\\iAdmin\\Event\\materialboxtarge"}
 */
class materialboxtarge extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $materialboxid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $targecolorid;

	/**
	 * @Policy {"nullable":true}
	 * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getNameSearch,targecolorid"}
	 */
	private $targecolorname;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\materialboxtarge
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getMaterialboxid() {
        return $this->materialboxid;
    }

    /**
     * @param type $materialboxid
     * @return \iAdmin\Model\materialboxtarge
     */
    public function setMaterialboxid($materialboxid) {
        $this->materialboxid = $materialboxid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getTargecolorid() {
        return $this->targecolorid;
    }

    /**
     * @param type $targecolorid
     * @return \iAdmin\Model\materialboxtarge
     */
    public function setTargecolorid($targecolorid) {
        $this->targecolorid = $targecolorid;
        return $this;
    }

}