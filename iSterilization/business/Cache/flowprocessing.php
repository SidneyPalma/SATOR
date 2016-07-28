<?php

namespace iSterilization\Cache;

use Smart\Common\Traits as Traits;
use iSterilization\Model\flowprocessing as Model;

class flowprocessing extends \Smart\Data\Cache {
    use Traits\TuserHandler;

    public function selectUserCode(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                u.id,
                u.username,
                u.fullname,
                u.isactive
            from
                users u
            where u.username = :usercode";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":usercode", $query, \PDO::PARAM_STR);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);
            self::_setSuccess(count($rows) != 0);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectUserFlow(array $data) {
        $id = $data['id'];
        $username = $data['username'];
        $password = $data['password'];
        $proxy = $this->getStore()->getProxy();

        $sql = "select username, password from users where id = :id and username = :username";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":id", $id, \PDO::PARAM_INT);
            $pdo->bindValue(":username", $username, \PDO::PARAM_STR);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            $passwordUser = (count($rows) != 0) ? $rows[0]['password'] : '';
            $success = self::tryHash($password,$passwordUser);
            $rows[0]['password'] = '';

            self::_setRows($rows);
            self::_setSuccess($success);
            self::_setText($success ? 'Autenticado com sucesso!' : 'Sua tentativa fracassou, o usuário NÂO foi Autenticado!');

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectOpenMaterial(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                ib.id,
                ib.name,
                ib.barcode,
                ib.description,
                dbo.binary2base64(ib.filedata) as filedata,
                ib.fileinfo,
                mf.name as manufacturername,
                -- tipo de fluxo e prioridade
                mtf.sterilizationtypeid,
                st.name as sterilizationtypename,
                mtf.prioritylevel,
                dbo.getEnum('prioritylevel',mtf.prioritylevel) as priorityleveldescription,
                st.name +' ('+ dbo.getEnum('prioritylevel',mtf.prioritylevel) +')' as sterilizationpriority
            from
                itembase ib
                inner join manufacturer mf on ( mf.id = ib.manufacturerid )
                inner join material m on ( m.id = ib.id )
                inner join materialtypeflow mtf on ( mtf.materialid = m.id and mtf.prioritylevel = 'N' )
                inner join sterilizationtype st on ( st.id = mtf.sterilizationtypeid )
            where ib.barcode = :barcode OR ib.name COLLATE Latin1_General_CI_AI LIKE :name";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":barcode", $query, \PDO::PARAM_INT);
            $pdo->bindValue(":name", "{$query}%", \PDO::PARAM_STR);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectOpenSterilizationType(array $data) {
        $materialid = $data['materialid'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                st.id,
                st.name,
                mtf.prioritylevel,
                dbo.getEnum('prioritylevel',mtf.prioritylevel) as priorityleveldescription,
                st.name +' ('+ dbo.getEnum('prioritylevel',mtf.prioritylevel) +')' as sterilizationpriority
            from
                itembase ib
                inner join material m on ( m.id = ib.id )
                inner join materialtypeflow mtf on ( mtf.materialid = m.id )
                inner join sterilizationtype st on ( st.id = mtf.sterilizationtypeid )
            where mtf.materialid = :materialid";

        try {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":materialid", $materialid, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

}