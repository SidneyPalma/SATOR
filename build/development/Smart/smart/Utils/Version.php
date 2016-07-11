<?php

namespace Smart\Utils;

/**
 * Version
 * 
 * Classe para controle de Versão
 * 
 */
class Version
{    
    private $major = 0;
    private $minor = 0;
    private $patch = 0;
    private $build = 0;
    private $release = '';
    private $version = '';
    private $archive = '';

    public function __construct($archive,$version) {

        date_default_timezone_set('America/Sao_Paulo');

        $this->archive = $archive;
        $this->version = $version;

        $this->callStepup();
    }

    public function setMajor () {
        $this->major++;
        $this->setNextVersion();
    }

    public function setMinor () {
        $this->minor++;
        $this->setNextVersion();
    }

    public function setPatch () {
        $this->patch++;
        $this->setNextVersion();
    }

    public function setBuild () {
        $this->build++;
        $this->setNextVersion();
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

        $this->getLastVersion();
    }

    public function getRelease () {
        return $this->release;
    }
    
    public function getVersion () {
        return $this->version;
    }

    public function getLastVersion () {
        //http://manas.tungare.name/software/css-compression-in-php/
        //http://stackoverflow.com/questions/643113/regex-to-strip-comments-and-multi-line-comments-and-empty-lines

        $app = file_get_contents($this->archive);

        $json = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $app);

        $json = preg_replace('![ \t]*//.*[ \t]*[\r\n]!', '', $json);

        $this->release = json_decode($json);

        list($this->major, $this->minor, $this->patch, $this->build) = @explode('.', $this->release->version);
    }

    public function setNextVersion () {
        $name = $this->release->name;
        $modulebuild = "{$this->major}.{$this->minor}.{$this->patch}.{$this->build}";

        $this->release->buildby = array(
            'logusername'=>gethostname(),
            'lastdateapp'=>date('Y-m-d H:i')
        );

        $this->release->version = $modulebuild;
        $archive = json_encode($this->release, JSON_PRETTY_PRINT);
        file_put_contents($this->archive, stripslashes($archive));

        return "... $name $modulebuild";
    }

}