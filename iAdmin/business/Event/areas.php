<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class areas extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\areas $model
     */
    public function preInsert( \iAdmin\Model\areas &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\areas $model
     */
    public function posInsert( \iAdmin\Model\areas &$model ) {

    }

    /**
     * @param \iAdmin\Model\areas $model
     */
    public function preUpdate( \iAdmin\Model\areas &$model ) {
        Session::hasProfile('','');

        if($model->getWorkstation() == 'update') {
            $guid = '';

            if($this->checUpdatekWorkstation($model)) {
//            if($this->checUpdatekWorkstation($model,$guid)) {
                throw new \PDOException("Para esta Área já existe uma Estação Configurada!!");
            }
//            $model->set('workstation',$guid);
            $model->set('workstation',strtoupper(md5($model->getName())));
        }

        if($model->getWorkstation() == 'delete') {

            if($this->checDeletekWorkstation($model)) {
                throw new \PDOException("Operação solicitada inválida, Estação diferente da atual!");
            }

            $model->set('workstation','');
        }
    }

    public function checDeletekWorkstation($model) {
        $id = $model->getId();

        $pdo = $this->getProxy()->prepare("select workstation, printlocate from areas where id = :id");
        $pdo->bindValue(":id", $id, \PDO::PARAM_INT);

        $pdo->execute();
        $rows = $pdo->fetchAll();

        return (count($rows) == 0);
    }

    public function checUpdatekWorkstation($model) {
        $id = $model->getId();

        $pdo = $this->getProxy()->prepare("select workstation, printlocate from areas where id = :id");
        $pdo->bindValue(":id", $id, \PDO::PARAM_INT);

        $pdo->execute();
        $rows = $pdo->fetchAll();
        $data = $rows[0];
//        $guid = $data['guid'];
        $workstation = $data['workstation'];

        return (strlen($workstation) != 0);
    }

    /**
     * @param \iAdmin\Model\areas $model
     */
    public function posUpdate( \iAdmin\Model\areas &$model ) {
    }

    /**
     * @param \iAdmin\Model\areas $model
     */
    public function preDelete( \iAdmin\Model\areas &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\areas $model
     */
    public function posDelete( \iAdmin\Model\areas &$model ) {

    }

}