<?php

namespace Smart\Setup;

class Start {

    //http://php.net/manual/pt_BR/timezones.america.php

    private static $usr = "sa";
    private static $sch = "dbo";
    private static $pwd = "1844";
    private static $dtb = "SATOR_TEST";
    private static $log = "SATOR_TEST_LOG";
    private static $tmz = "America/Sao_Paulo";
    private static $dns = "sqlsrv:server=(local);database=dtb";

    public static function tableSchema() {
        return self::$sch;
    }
    public static function getPassWord() {
        return self::$pwd;
    }
    public static function getUserName() {
        return self::$usr;
    }
    public static function getTimeZone() {
        return self::$tmz;
    }
    public static function getDataBase() {
        return self::$dtb;
    }
    public static function setTimeZone() {
        date_default_timezone_set(self::$tmz);
    }
    public static function getConnnect() {
        return str_replace("dtb",self::$dtb,self::$dns);
    }
    public static function logConnnect() {
        return str_replace("dtb",self::$log,self::$dns);
    }

}