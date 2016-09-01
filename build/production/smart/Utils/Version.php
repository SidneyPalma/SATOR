<?php

namespace Smart\Utils;

use Smart\Data\Proxy;
use Smart\Setup\Start;
use Smart\Utils\Session;
use Smart\Common\Traits;

/**
 * Version
 *
 * Classe para controle de Versão
 *
 */
class Version {
    use Traits\TresultSet;

    private $major = 0;
    private $minor = 0;
    private $patch = 0;
    private $build = 0;
    private $configs = '';
    private $release = '';
    private $version = '';
    private $archive = '';

    /**
     * Copy a file, or recursively copy a folder and its contents
     * @author      Aidan Lister <aidan@php.net>
     * @version     1.0.1
     * @link        http://aidanlister.com/2004/04/recursively-copying-directories-in-php/
     * @find        http://stackoverflow.com/questions/2050859/copy-entire-contents-of-a-directory-to-another-using-php
     * @param       string   $source    Source path
     * @param       string   $target      Destination path
     * @param       int      $permissions New folder creation permissions
     * @return      bool     Returns true on success, false on failure
     */
    public function setXCopy ($source, $target, $module = array()) {
        $permissions = 0755;

        // Check for symlinks
        if (is_link($source)) {
            return symlink(readlink($source), $target);
        }

        // Simple copy for a file
        if (is_file($source)) {
            return copy($source, $target);
        }

        // Make destination directory
        if (!is_dir($target)) {
            mkdir($target, $permissions);
        }

        // Loop through the folder
        $dir = dir($source);

        while (false !== $entry = $dir->read()) {
            $skip = false;

            if (is_dir($source)) {
                foreach ($module as $key) {
                    if(strpos($source, $key) != false) {
                        $skip = true;
                    }
                }
            }

            if($skip == true) {
                continue;
            }

            // Skip pointers
            if ($entry == '.' || $entry == '..') {
                continue;
            }

            // Deep copy directories
            $this->setXCopy("$source/$entry", "$target/$entry", $module);
        }

        // Clean up
        $dir->close();

        return true;
    }

    public function setMajor () {
        $this->major++;
    }

    public function setMinor () {
        $this->minor++;
    }

    public function setPatch () {
        $this->patch++;
    }

    public function setBuild () {
        $this->build++;
    }

    public function getMajor () {
        return $this->major;
    }

    public function getMinor () {
        return $this->minor;
    }

    public function getPatch () {
        return $this->patch;
    }

    public function getBuild () {
        return $this->build;
    }

    public function getRelease () {
        return $this->release;
    }

    public function getVersion () {
        return $this->version;
    }

    public function callStepup () {
        $stepup = @explode('|',$this->version);
        $this->getLastVersion();

        if(is_array($stepup)) {
            foreach ($stepup as $method) {
                if(method_exists($this, 'set'.$method)){
                    call_user_func(array($this, 'set'.$method));
                }
            }
        }
    }

    public function removeComments ($json) {
        $json = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $json);
        $json = preg_replace('![ \t]*//.*[ \t]*[\r\n]!', '', $json);
        return json_decode($json);
    }

    public function getLastVersion () {
        $file = file_get_contents($this->archive);

        $this->release = $this->removeComments($file);

        list($this->major, $this->minor, $this->patch, $this->build) = @explode('.', $this->release->version);
    }

    public function setNewThrowFile () {
        $root = '../';
        $throw = "throw.json";
        $workspace = "workspace.json";

        /**
         * workspace file
         */
        $file = file_get_contents($root . $workspace);
        $json = $this->removeComments($file);
        $json = json_encode($json, JSON_PRETTY_PRINT);
        file_put_contents($root . $workspace, stripslashes($json));
        $workspaceFile = (object) self::jsonToArray($json);

        /**
         * throw file
         */
        $file = file_get_contents($root . $throw);
        $json = $this->removeComments($file);
        $json = json_encode($json, JSON_PRETTY_PRINT);
        $throwFile = (object) self::jsonToArray($json);

        $apps = array();

        foreach ($workspaceFile->apps as $app) {
            $apps[$app] = false;
        }

        $throwFile->module = $apps;

        $json = json_encode($throwFile, JSON_PRETTY_PRINT);
        file_put_contents($root . $throw, stripslashes($json));
        file_put_contents($root . 'build/' . $throw, stripslashes($json));
    }

    public function setBuildVersion ($archive,$version) {
        $this->setNewThrowFile();

        $this->archive = $archive;
        $this->version = $version;

        $this->callStepup();

        $dns = Start::getConnnect();
        $pwd = Start::getPassWord();
        $usr = Start::getUserName();

        $proxy = new Proxy(array($dns, $usr, $pwd), array('name'=>'build', 'path'=>'/'));

        $name = $this->release->name;
        $modulebuild = "{$this->major}.{$this->minor}.{$this->patch}.{$this->build}";

        $this->release->buildby = array(
            'application'=>'production',
            'logusername'=>gethostname(),
            'lastdateapp'=>date('Y-m-d H:i')
        );

        $this->release->version = $modulebuild;
        $archive = json_encode($this->release, JSON_PRETTY_PRINT);
        file_put_contents($this->archive, stripslashes($archive));

        $sql = "update module set modulebuild = :modulebuild where name = :name";

        $pdo = $proxy->prepare($sql);
        $pdo->bindValue(":name", $name, \PDO::PARAM_STR);
        $pdo->bindValue(":modulebuild", $modulebuild, \PDO::PARAM_STR);
        $pdo->execute();

        return "... $name $modulebuild";
    }

	public function setSourceBase ($configs) {
	}
	
    public function setThrowVersion ($configs) {
        $root = '../../';
        $module = array();
        $config = array();

        $this->configs = (object) $configs;

        foreach ($this->configs->module as  $key => $val) {
            if($val == false) {
                $module[] = $key;
            }
            if($val == true) {
                $config[] = $key;
            }
        }

        // Step 1
        // copiar arquivos
        $source = $root . $this->configs->source;
        $holder = $root . $this->configs->holder;
        $target = $root . $this->configs->target;

        $this->setXCopy($source,$target,$module);
        $this->setXCopy($holder,$target);

        $dns = Start::getConnnect();
        $pwd = Start::getPassWord();
        $usr = Start::getUserName();
        $proxy = new Proxy(array($dns, $usr, $pwd), array('name'=>'build', 'path'=>'/'));

        // Step 2
        // atualiza versão do banco produção, registra log de atualização
        foreach ($config as $app) {
            $classic = json_decode(file_get_contents("$target/$app/classic.json"));
            $version = $classic->version;
            $logusername = $classic->buildby->logusername;
            $lastdateapp = $classic->buildby->lastdateapp;

            $sql = "
                    declare
                        @name varchar(20) = :name,
                        @version varchar(20) = :version,
                        @logusername varchar(80) = :logusername, 
                        @lastdateapp varchar(80) = :lastdateapp; 

                    update module set modulebuild = @version where name = @name;

                    insert into modulethrowversion
                        (name, version, logusername, lastdateapp)
                    values 
                        (@name, @version, @logusername, @lastdateapp);";

            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":name", $app, \PDO::PARAM_STR);
            $pdo->bindValue(":version", $version, \PDO::PARAM_STR);
            $pdo->bindValue(":logusername", $logusername, \PDO::PARAM_STR);
            $pdo->bindValue(":lastdateapp", $lastdateapp, \PDO::PARAM_STR);
            $pdo->execute();
        }

        // Step 3
        // reset arquivo de configuração "throw.json"
        foreach ($this->configs->module as $key => $val) {
            $this->configs->module[$key] = false;
        }

        $file = $root . "throw.json";
        $json = json_encode($this->configs, JSON_PRETTY_PRINT);
        file_put_contents($file, stripslashes($json));

        return "... versao em producao";
    }

}