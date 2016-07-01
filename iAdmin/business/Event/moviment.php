<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class moviment extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\moviment $model
     */
    public function preInsert( \iAdmin\Model\moviment &$model ) {
        Session::hasProfile('','');
        $username = $this->session->username;
        $model->set('username',$username);
        $model->set('movimentstatus','A');
    }

    /**
     * @param \iAdmin\Model\moviment $model
     */
    public function posInsert( \iAdmin\Model\moviment &$model ) {

    }

    /**
     * @param \iAdmin\Model\moviment $model
     */
    public function preUpdate( \iAdmin\Model\moviment &$model ) {
        Session::hasProfile('','');

        $this->valUpdate($model);
    }

    /**
     * Validar update Encerramento
     * @param $model
     * @return \Smart\Common\Traits\json
     */
    public function valUpdate($model) {
        $id = $model->getId();
        $statusnew = $model->getMovimentstatus();

        $pdo = $this->getProxy()->prepare("select movimentstatus from moviment where id = :id");
        $pdo->bindValue(":id", $id, \PDO::PARAM_INT);

        $pdo->execute();
        $rows = $pdo->fetchAll();
        $statusold = $rows[0]['movimentstatus'];

        if( $statusold == 'E' ) {
            throw new \PDOException("Este movimento não pode ser modificado pois está Encerrado!");
        }

        if(($statusnew == 'E') && ($statusold != 'F')) {
            throw new \PDOException("Este movimento não pode ser encerrado pois não está Fechado!");
        }

        if(($statusnew == 'E') && ($statusold == 'F')) {
            $sql = "
                select
                    mi.id,
                    mi.movimentid,
                    mi.inputid,
                    mi.presentation,
                    mi.quantity,
                    mi.datevalidity,
                    mi.lotpart,
                    mi.isactive
                from
                    movimentitem mi
                where mi.movimentid = :id";

            $pdo = $this->getProxy()->prepare($sql);
            $pdo->bindValue(":id", $id, \PDO::PARAM_INT);

            $pdo->execute();
            $rows = $pdo->fetchAll();

            $this->setUpdate($rows);
        }
    }

    public function setUpdate ($rows) {
        foreach ($rows as $item) {
            $pdo = $this->getProxy()->prepare("");
            $pdo->execute();
        }
    }

    /**
     * @param \iAdmin\Model\moviment $model
     */
    public function posUpdate( \iAdmin\Model\moviment &$model ) {

    }

    /**
     * @param \iAdmin\Model\moviment $model
     */
    public function preDelete( \iAdmin\Model\moviment &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\moviment $model
     */
    public function posDelete( \iAdmin\Model\moviment &$model ) {

    }

}