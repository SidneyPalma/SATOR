<?php

require_once '../vendor/autoload.php';

use Smart\Utils\Version;

$fileJson = '../../throw.json';

if(!file_exists($fileJson)) {
	echo "... Arquivo de configuracao ausente!";
	return false;
}

$apps = 0;
$configs = json_decode(file_get_contents($fileJson), JSON_PRETTY_PRINT);
$appJson = (object) $configs;

foreach ($appJson->module as  $key => $val) {
	$apps += $val ? 1 : 0;
}

if($apps == 0) {
	echo "... Nao existem atualizacoes pendentes!";
	return false;
}

$version = new Version();

echo $version->setThrowVersion($configs);