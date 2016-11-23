<?php

namespace iSterilization\Cache;

use Endroid\QrCode\QrCode;
use iSterilization\Model\armorymovement as Model;

class armorymovement extends \Smart\Data\Cache {

    public function renderCode(array $data) {
        $barCode = isset($_GET['barCode']) ? $_GET['barCode'] : null;

        if(!$barCode) {
            return false;
        }

        $qrCode = new QrCode();
        header( 'Content-type: image/png' );
        $qrCode
            ->setText("MOV-$barCode")
            ->setSize(54)
            ->setPadding(1)
            ->setErrorCorrection('high')
            ->setImageType(QrCode::IMAGE_TYPE_PNG)
            ->render();

        exit;
    }

}