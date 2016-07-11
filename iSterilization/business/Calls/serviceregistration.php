<?php

require_once '../../vendor/autoload.php';

$object = new \iSterilization\Coach\serviceregistration();

echo $object->callAction();