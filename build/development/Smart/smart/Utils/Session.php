<?php

namespace Smart\Utils;

use Smart\Data\Proxy;
use Smart\Setup\Start;
use Smart\Common\Traits as Traits;

/**
 * Session
 * 
 * Realiza o controle de autenticação do Usuário no servidor
 *
 * Validar permissões de acesso - Profile
 * 
 * <code>
 * $session = Session::getInstance();
 * </code>
 */
class Session {
    use Traits\TresultSet;

    public static function have() {
        $usercode = self::read('usercode');
        return ( $usercode !== false );
    }

    public static function read($id) {
        @\session_start();
        return isset($_SESSION[$id]) ? $_SESSION[$id]: false;
    }

    public static function save($id, $data) {
        @\session_start();
        return $_SESSION[$id] = $data;
    }

    public static function kill() {
        @\session_start();
        @\session_unset();
//        setcookie("PHPSESSID","",time()-3600,"/");
        return @\session_destroy();
    }

    public static function slay() {
        @\session_start();
        unset($_SESSION['usercode']);
    }

    public static function setProfile($profile) {
        $data = self::arrayToJson($profile);
        return self::save('_profile', $data);
    }

    public static function hasProfile($menu, $action, $goback = false) {
        $module = self::read('module');
        $username = self::read('username');

        $dns = Start::getConnnect();
        $pwd = Start::getPassWord();
        $usr = Start::getUserName();

        $proxy = new Proxy(array($dns, $usr, $pwd));

        $sql = "
            select
                u.isactive,
                uma.expireto,
                a.negation
            from
                action a
                inner join menuaction ma on ( ma.actionid = a.id )
                inner join modulemenu mm on ( mm.menuid = ma.menuid )
                inner join menu m on ( m.id = mm.menuid )
                inner join module md on ( md.id = mm.moduleid )
                inner join usersmenu um on ( um.modulemenuid = mm.id )
                inner join usersmenuaction uma on ( uma.menuactionid = ma.id and uma.usersmenuid = um.id )
                inner join users u on ( u.id = um.usersid )
            where m.guid = :menu
              and a.guid = :action
              and md.name = :module
              and u.username = :username";

        try {

            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":menu", $menu, \PDO::PARAM_STR);
            $pdo->bindValue(":action", $action, \PDO::PARAM_STR);
            $pdo->bindValue(":module", $module, \PDO::PARAM_STR);
            $pdo->bindValue(":username", $username, \PDO::PARAM_STR);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        $credential = (object) self::getResult();

        if($goback === true) {
            return $credential;
        }

        if($credential->records == 0) {
            throw new \PDOException('Não existe permissão habilitada para esta ação no seu perfil!');
        }

        $expireto = $credential->rows[0]['expireto'];
        $isactive = $credential->rows[0]['isactive'];
        $negation = $credential->rows[0]['negation'];

        if($isactive != 1) {
            throw new \PDOException($negation . '.<br/><br/> O seu login esta desabilitado!');
        }

        $format = "Y-m-d";
        $date1  = \DateTime::createFromFormat($format, $expireto);
        $date2  = \DateTime::createFromFormat($format, date("Y-m-d"));

        if($date1 < $date2) {
            throw new \PDOException($negation . '.<br/> <br/>A data para esta ação expirou!');
        }

    }

}
//http://stackoverflow.com/questions/3740845/php-session-without-cookies
//ini_set('session.use_cookies', 0);
//ini_set('session.use_only_cookies', 0);
//ini_set('session.use_trans_sid', 1);
//session_start();
//// IP check
//if($_SESSION['ip_check'] != $_SERVER['REMOTE_ADDR']){
//    session_regenerate_id();
//    session_destroy();
//    session_start();
//}
//$_SESSION['ip_check'] = $_SERVER['REMOTE_ADDR'];
//// session stuff