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

    public function QrCode($qrCode,$qrStep) {
        $qrTemp = __DIR__;
        $tpStep = self::arrayToOject($qrStep);
        $colorFore = array('r' => 0, 'g' => 0, 'b' => 0, 'a' => 0);
        $colorBack = array('r' => 255, 'g' => 255, 'b' => 255, 'a' => 0);

        $qrFile = "{$qrTemp}{$tpStep->text}.png";

        $qrCode
            ->setText($tpStep->text)
            ->setSize(60)
            ->setPadding(10)
//            ->setLabel($tpStep->mark)
//            ->setLabelFontSize(10)
            ->setErrorCorrection('high')
            ->setForegroundColor($colorFore)
            ->setBackgroundColor($colorBack)
            ->setImageType(QrCode::IMAGE_TYPE_PNG)
            ->render($qrFile);

        $this->Image($qrFile,$tpStep->posX,$tpStep->posY);
        unlink($qrFile);
    }

    public function Detail() {
        $qrStep = [];
        $qrCode = new QrCode();
        $sw = intval($this->squareWidth / 2);
        $flow = self::encodeUTF8(self::jsonToArray($this->rows->dataflowstep));

        $posX = intval($sw/2) + (2.3);

        $this->Ln(5);
        $this->configStyleHeader(14);

        $list = self::searchArray($flow,'exceptiondo',1);

        $i = 0;

        foreach ($list as $item) {
            $list[$i]['step'] = self::searchArray($flow,'source',$item['steplevel']);
            $i++;
        }

        foreach ($list as $item) {
            $step = self::arrayToOject($item['step']);
            $elementname = utf8_decode($item['elementname']);

            $this->configStyleHeader(12);
            $this->Cell($sw * 1.0,10,$elementname,'B',1,'C',1);

            foreach ($step as $field => $value) {
                $this->Ln(1);
                $qrStep['posX'] = $posX;
                $qrStep['posY'] = $this->y;
                $qrStep['text'] = $value->barcode;
                $qrStep['mark'] = $value->elementname;

                $this->QrCode($qrCode,$qrStep);
                $this->Cell($sw * 1.0,20,'',0,1,'C',0);
                $this->SetFont('Arial', '', 10);
                $this->Cell($sw * 1.0,7,utf8_decode($value->elementname),0,1,'C',0);
            }
        }
    }

}