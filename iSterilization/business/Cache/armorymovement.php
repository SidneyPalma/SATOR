<?php

namespace iSterilization\Cache;

use Endroid\QrCode\QrCode;
use iSterilization\Model\armorymovement as Model;

class armorymovement extends \Smart\Data\Cache {

    public function renderCode(array $data) {
        $barcode = $_GET['barCode'];
        $qrCode = new QrCode();
        header( 'Content-type: image/png' );
        $qrCode
            ->setText($barcode)
            ->setSize(46)
            ->setPadding(1)
            ->setErrorCorrection('high')
            ->setImageType(QrCode::IMAGE_TYPE_PNG)
            ->render();

        exit;
    }

}