<?php

namespace Smart\Data;

use Smart\Setup\Start;
use Smart\Utils\Session;
use Smart\Common\Traits as Traits;

/**
 * Um Proxy de acesso ao banco de dados "Caixa Preta"
 *
 * ex.: "sqlsrv:server=(local);database=fgv"
 *      "mysql:host=localhost;dbname=fgv"
 *
 * @package Smart\Data
 */
class Black extends \PDO {
    use Traits\TresultSet;

    private static $pwd = "";
    private static $usr = "root";
    private static $dtb = "bighero";
    private static $dns = "mysql:host=localhost;dbname=dtb";

    public function __construct() {

        $dns = self::getConnnect();
        $usr = self::getUserName();
        $pwd = self::getPassWord();

        Start::setTimeZone();

        try {
            parent::__construct( $dns, $usr, $pwd );
            $this->setAttribute( \PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION );
            $this->setAttribute( \PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC );
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText('Não foi possível acessar a base de dados de terceiros!');
            echo self::getResultToJson();
        }
    }

    public static function getConnnect() {
        return str_replace("dtb",self::$dtb,self::$dns);
    }
    public static function getPassWord() {
        return self::$pwd;
    }
    public static function getUserName() {
        return self::$usr;
    }
	
	public function getPatient(array $data) {
		$query = $data['query'];
		$start = $data['start'];
		$limit = $data['limit'];

		$sql = "
            select
                AVISO_CIRURGIA as id,
                COD_PACIENTE as id_patient,
                PACIENTE as name,
                CONVENIO as health_insurance,
                SALA_PROCEDIMENTO as surgical_room,
                PROCEDIMENTO as surgical_procedure,
                DATE_FORMAT(DATA_HORA,'%Y-%m-%d') as dateof,
                DATE_FORMAT(DATA_HORA,'%h:%i') as timeof,
                TP_SITUACAO as surgical_status,
                TP_PROCEDIMENTO surgical_type
            from
                avisocirurgia
            where AVISO_CIRURGIA like :AVISO_CIRURGIA or PACIENTE like :PACIENTE";

		try {

			$query = "%{$query}%";

			$pdo = $this->prepare($sql);
			$pdo->bindValue(":PACIENTE", $query, \PDO::PARAM_STR);
			$pdo->bindValue(":AVISO_CIRURGIA", $query, \PDO::PARAM_STR);
			$pdo->execute();
			$rows = $pdo->fetchAll();

			self::_setRows($rows);
			self::_setPage($start,$limit);

		} catch ( \PDOException $e ) {
			self::_setSuccess(false);
			self::_setText($e->getMessage());
		}

		return self::getResultToJson();
	}

}