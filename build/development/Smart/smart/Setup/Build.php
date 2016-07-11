<?php

require_once '../vendor/autoload.php';

use Smart\Utils\Version;

$i = 0;
$j = 0;
$list = array();

foreach ($argv as $item) {

	if($i == 1) {
		$appName = "../$item/app.json";
	}

	if($i >= 2) {
		$list[$j] = $item;
		$j++;
	}

	$i++;
}

$version = new Version($appName,trim(implode('|', $list)));

echo $version->setNextVersion();