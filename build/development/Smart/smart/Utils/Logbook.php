<?php

namespace Smart\Utils;

use Smart\Setup\Start;
use Smart\Utils\Session;

class Logbook extends \Smart\Data\Proxy {

    private $logtables = "
        insert logtables
            ( tablename, operation, logbookby )
        values
            ( :tablename, :operation, :logbookby )";

    private $logfields = "
        insert logfields
            ( logtablesid, fieldname, fieldvalue )
        values
            ( :logtablesid, :fieldname, :fieldvalue )";

    public function __construct($model) {
        $this->submit = $_POST;
        $this->pwd = Start::getPassWord();
        $this->usr = Start::getUserName();
        $this->dns = Start::logConnnect();
        $entity = $model->getNotate()->instance->Entity;

        if($entity->logbook != 1) {
            exit;
        }

        $link = array( $this->dns, $this->usr, $this->pwd );

        parent::__construct( $link );

        $this->setLogAction($model);
    }

    public function setLogAction ($model) {
        $rows = $model->getSubmit()->getRow();
        $property = $model->getNotate()->property;
        $logbookby = Session::read('username');
        $operation = $model->getSubmit()->getRawValue('action');
        $tablename = $model->getNotate()->instance->Entity->name;

        $pdo = $this->prepare($this->logtables);
        $pdo->bindValue(':tablename',$tablename, \PDO::PARAM_STR);
        $pdo->bindValue(':operation',$operation, \PDO::PARAM_STR);
        $pdo->bindValue(':logbookby',$logbookby, \PDO::PARAM_STR);
        $pdo->execute();

        $logtablesid = $this->lastInsertId();

        foreach ($rows as $field => $value) {
            $logallow = false;

            if($field == 'id') {
                $logallow = true;
            } else if ($property[$field]['Policy']['logallow'] == 1) {
                $logallow = true;
            }

            if($logallow == true) {
                $pdo = $this->prepare($this->logfields);
                $pdo->bindValue(':fieldname',$field, \PDO::PARAM_STR);
                $pdo->bindValue(':fieldvalue',$value, \PDO::PARAM_STR);
                $pdo->bindValue(':logtablesid',$logtablesid, \PDO::PARAM_INT);
                $pdo->execute();
            }
        }
    }

}