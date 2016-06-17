<?php

namespace iAdmin\Event;


use Smart\Utils\Session;
use Smart\Mail\PasswordForgot;

class users extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\users $model
     */
    public function preInsert( \iAdmin\Model\users &$model ) {
        Session::hasProfile('27F003DB-A946-436D-8E25-2C5983E98B5A','589F0BF9-0EFA-42B0-8C42-24C4B1BF41E4');
    }

    /**
     * @param \iAdmin\Model\users $model
     */
    public function posInsert( \iAdmin\Model\users &$model ) {
        $this->getProxy()->setUpload($model);
        $this->setInvite($model);
    }

    public function setInvite($model) {
        $id = $model->getId();

        $sql = "
                select
                    id,
                    username,
                    fullname,
                    mainmail,
                    replace(convert(varchar(10),birthdate,102),'.','-') as birthdate
                from
                    users
                where id = :id";

        try {

            $pdo = $this->getProxy()->prepare($sql);
            $pdo->bindValue(":id", $id, \PDO::PARAM_INT);

            $pdo->execute();
            $rows = $pdo->fetchAll();
            $data = $rows[0];

            self::_setRows($rows);
            self::_setText("E-mail enviado com sucesso para: {$data['mainmail']}");

            if(count($rows) === 0) {
                throw new \PDOException("Este Usuário não está cadastrado na nossa base de dados!");
            }

            $id = $data['id'];
            $fullname = $data['fullname'];

            $data['password'] = $password = substr(self::getHash($fullname),8,6);

            $updPwd = "update users set password = '{$password}' where id = {$id}";

            $this->getProxy()->exec($updPwd);

            $body = file_get_contents("../../../smart/Mail/tpl/PasswordForgot.html");

            $mail = new PasswordForgot();
            $mail->configEmail($data, $body);
            $mail->Send();

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    /**
     * @param \iAdmin\Model\users $model
     */
    public function preUpdate( \iAdmin\Model\users &$model ) {
        Session::hasProfile('27F003DB-A946-436D-8E25-2C5983E98B5A','4BF2F3C8-BFC0-4DD8-A491-B2C4C3673C69');
    }

    /**
     * @param \iAdmin\Model\users $model
     */
    public function posUpdate( \iAdmin\Model\users &$model ) {
        $this->getProxy()->setUpload($model);
    }

    /**
     * @param \iAdmin\Model\users $model
     */
    public function preDelete( \iAdmin\Model\users &$model ) {
        Session::hasProfile('27F003DB-A946-436D-8E25-2C5983E98B5A','3BFFF554-F6E1-4ED1-9178-0B4FF614B997');
    }

    /**
     * @param \iAdmin\Model\users $model
     */
    public function posDelete( \iAdmin\Model\users &$model ) {

    }

}