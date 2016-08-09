<?php

namespace iAdmin\Quick;

use Smart\Utils\Report;
use Smart\Utils\Session;
use Endroid\QrCode\QrCode;

class exceptionbyflow extends Report {

    public function preConstruct() {
        parent::preConstruct();

        $this->post = (object) self::decodeUTF8($_REQUEST);

        $id = $this->post->id;

        $sql = "select name, dataflowstep, version from sterilizationtype where id = :id";

        $pdo = $this->proxy->prepare($sql);
        $pdo->bindValue(":id", $id, \PDO::PARAM_INT);

        $pdo->execute();
        $rows = self::encodeUTF8($pdo->fetchAll());
        $this->rows = (object) $rows[0];
    }

    public function Header() {
        $name = $this->rows->name;
        $version = $this->rows->version;
        $this->squareWidth = $this->getInternalW();
        $sizeColumns = array(intval($this->squareWidth / 2),intval($this->squareWidth / 2));
        $this->sizeColumns = $this->scaleCalc(array_sum($sizeColumns),intval($this->squareWidth),$sizeColumns);

        $sw = intval($this->squareWidth / 10);
        $module = current(explode( '\\', __NAMESPACE__ ));
        $this->setLogoMark(12,13,15,15);
        $this->setLogoTipo($module,($this->squareWidth - 2),13,15,15);

        $this->SetFont('Arial', '', 16);
        $this->Cell($sw * 1.0,4, '',0,0,'L');
        $this->Cell($sw * 9.0,4, $this->getEntity()->name,0,1,'L');
        $this->SetFont('Arial', '', 10);
        $this->Cell($sw * 1.0,7, '',0,0,'L');
        $this->Cell($sw * 9.0,7, utf8_decode("CME - Protocolos Operacionais"),0,1,'L');
        $this->SetFont('Arial', '', 8);
        $this->Cell($sw * 1.0,4, '',0,0,'L');
        $this->Cell($sw * 9.0,4, $this->getEntity()->legalname,0,1,'L');

        $this->SetLineWidth(.2);
        $this->Cell($this->squareWidth,3, '','T',1,'C');
        $this->configStyleHeader(16);
        $this->Cell($this->getInternalW(),6, "$name v.$version",0,1,'C',false);
    }

    public function Detail() {
        $data = [];
        $qrTemp = __DIR__;
        $qrCode = new QrCode();
        $sw = intval($this->squareWidth / 2);
        $colorFore = array('r' => 0, 'g' => 0, 'b' => 0, 'a' => 0);
        $colorBack = array('r' => 255, 'g' => 255, 'b' => 255, 'a' => 0);
        $flow = self::encodeUTF8(self::jsonToArray($this->rows->dataflowstep));

        $next = 0;
        $true = 0;
        $posY = 55;
        $posX = intval($sw/2);

        $this->Ln(5);
        $this->configStyleHeader(14);

        $list = self::searchArray($flow,'exceptiondo',1);

        $i = 0;

        foreach ($list as $item) {
            $list[$i]['step'] = self::searchArray($flow,'source',$item['steplevel']);
            $i++;
        }

        foreach ($list as $item) {
            $next++;
            $true = !($next % 2) ? 1 : 0;

            $elementname = utf8_decode($item['elementname']);

            $this->Cell($sw * 1.0,10,$elementname,'B',$true,'C',1);

            if($true == 1) {
                $this->Cell($sw * 2.0,30,'',0,$true,'L',0);
            }

//            $qrFile = "{$qrTemp}{$code}.png";
//
//            $qrCode->setText($code)
//                ->setSize(70)
//                ->setPadding(10)
//                ->setLabel($code)
//                ->setLabelFontSize(10)
//                ->setErrorCorrection('high')
//                ->setForegroundColor($colorFore)
//                ->setBackgroundColor($colorBack)
//                ->setImageType(QrCode::IMAGE_TYPE_PNG)
//                ->render($qrFile);
//
//            $posX = ($true == 1) ? (intval($sw/2)+$sw) : $posX;
//
//            $this->Image($qrFile,$posX,$posY);
//            $posY += ($true == 1) ? 40 : 0;
//            $posX = intval($sw/2);
//            unlink($qrFile);
        }

//        while(list(, $item) = each($this->rows)) {
//            extract($item);
//
//            $next++;
//            $true = !($next % 2) ? 1 : 0;
//
//            $this->Cell($sw * 1.0,10,$description,'B',$true,'C',1);
//
//            if($true == 1) {
//                $this->Cell($sw * 2.0,30,'',0,$true,'L',0);
//            }
//
//            $qrFile = "{$qrTemp}{$code}.png";
//
//            $qrCode->setText($code)
//                ->setSize(70)
//                ->setPadding(10)
//                ->setLabel($code)
//                ->setLabelFontSize(10)
//                ->setErrorCorrection('high')
//                ->setForegroundColor($colorFore)
//                ->setBackgroundColor($colorBack)
//                ->setImageType(QrCode::IMAGE_TYPE_PNG)
//                ->render($qrFile);
//
//            $posX = ($true == 1) ? (intval($sw/2)+$sw) : $posX;
//
//            $this->Image($qrFile,$posX,$posY);
//            $posY += ($true == 1) ? 40 : 0;
//            $posX = intval($sw/2);
//            unlink($qrFile);
//        }
    }

}