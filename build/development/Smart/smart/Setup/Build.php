<?php

require_once '../vendor/autoload.php';

use Smart\Utils\Version;

$i = 0;
$j = 0;
$list = array();
$version = new Version();

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

echo $version->setBuildVersion($appName,trim(implode('|', $list)));