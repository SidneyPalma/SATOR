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
     * @Column {"description":"", "type":"boolean", "policy":true, "logallow":true, "default":"0"}
     */
    private $isstartstate;

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
    public function getIsstartstate() {
        return $this->isstartstate;
    }

    /**
     * @param type $isstartstate
     * @return \iAdmin\Model\cmeareas
     */
    public function setIsstartstate($isstartstate) {
        $this->isstartstate = $isstartstate;
        return $this;
    }

}