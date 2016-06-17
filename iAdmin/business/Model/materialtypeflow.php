<?php

namespace iAdmin\Model;

/**
 * 
 * @Entity {"name":"materialtypeflow", "logbook":true, "cache":"\\iAdmin\\Cache\\materialtypeflow", "event":"\\iAdmin\\Event\\materialtypeflow"}
 */
class materialtypeflow extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":false, "logallow":true, "default":""}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $materialid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true, "logallow":true, "default":""}
     */
    private $sterilizationtypeid;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getNameSearch,sterilizationtypeid"}
     */
    private $sterilizationtypeidname;

    /**
     * @Policy {"nullable":false, "length":1}
     * @Column {"description":"", "type":"string", "policy":true, "logallow":true, "default":""}
     */
    private $prioritylevel;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"formula", "policy":false, "logallow":true, "default":"getEnumSearch,prioritylevel"}
     */
    private $priorityleveldescription;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iAdmin\Model\materialtypeflow
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getMaterialid() {
        return $this->materialid;
    }

    /**
     * @param type $materialid
     * @return \iAdmin\Model\materialtypeflow
     */
    public function setMaterialid($materialid) {
        $this->materialid = $materialid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getSterilizationtypeid() {
        return $this->sterilizationtypeid;
    }

    /**
     * @param type $sterilizationtypeid
     * @return \iAdmin\Model\materialtypeflow
     */
    public function setSterilizationtypeid($sterilizationtypeid) {
        $this->sterilizationtypeid = $sterilizationtypeid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getPrioritylevel() {
        return $this->prioritylevel;
    }

    /**
     * @param type $prioritylevel
     * @return \iAdmin\Model\materialtypeflow
     */
    public function setPrioritylevel($prioritylevel) {
        $this->prioritylevel = $prioritylevel;
        return $this;
    }

}