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
            self::_setText('Não foi possível acessar a base de dados!');
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

}