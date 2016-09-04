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
        $this->configStyleHeader(10);
        $this->Cell($this->squareWidth,6, "$name v.$version",0,1,'C',false);
    }

    public function QrCode(&$qrCode,$qrStep) {
        $sw = $this->squareWidth / 2;
        $qrTemp = __DIR__;

        $this->Ln(20);

        $line = 1;

        foreach ($qrStep as $item) {
            $elementname = $item['elementname'];
            $barcodestep = $item['barcodestep'];

            $line = $line == 0 ? 1 : 0;
            $this->configStyleHeader(12);
            $this->SetFillColor(245, 242, 198);
            $this->Cell($sw,10,$elementname,1,$line,'C',1);

            $qrFile = "{$qrTemp}{$barcodestep}.png";

            $qrCode
                ->setText($barcodestep)
                ->setSize(50)
                ->setPadding(0)
                ->setErrorCorrection('high')
                ->setImageType(QrCode::IMAGE_TYPE_PNG)
                ->render($qrFile);

            $this->Image($qrFile,$sw-$this->x+64,$this->y+($line == 0 ? 17 : 7));
            unlink($qrFile);

            if($line == 1) {
                $this->Cell($sw * 2,30,'',1,1,'C',0);
            }
        }
    }

    public function Detail() {
        $qrTemp = __DIR__;
        $qrCode = new QrCode();
        $flow = self::decodeUTF8(self::jsonToArray($this->rows->dataflowstep));

        $i = 0;
        $list = [];
        $rows = [];
        foreach ($flow as $item) {
            if(strlen($item['areasid']) != 0) {
                $steplevel = $item['steplevel'];
                $list[$i]['elementname'] = $item['elementname'];
                $list[$i]['barcodestep'] = isset($item['barcode']) ? $item['barcode'] : $i;
                $j = 0;
                foreach ($flow as $data) {
                    if((strlen($data['equipmentid']) != 0) && ($steplevel == $data['source'])) {
                        $list[$i]['elementitem'][$j]['elementname'] = $data['elementname'];
                        $list[$i]['elementitem'][$j]['barcodestep'] = isset($data['barcode']) ? $data['barcode'] : $j;
                        $j++;
                    }
                }
                $i++;
            }
        }

        foreach ($list as $item) {
            if(isset($item['elementitem'])) {
                $rows[] = $item;
            }
        }

        $this->configStyleHeader(15);

        foreach ($rows as $item) {
            $elementname = $item['elementname'];
            $barcodestep = $item['barcodestep'];

            $this->configStyleHeader(15);
            $this->Cell($this->squareWidth,10,$elementname,0,1,'C',0);

            $qrMargin = ($this->getInternalW() / 2)-$this->lMargin - 2;

            $this->SetX($qrMargin);

            $qrFile = "{$qrTemp}{$barcodestep}.png";

            $qrCode
                ->setText($barcodestep)
                ->setSize(50)
                ->setPadding(0)
                ->setErrorCorrection('high')
                ->setImageType(QrCode::IMAGE_TYPE_PNG)
                ->render($qrFile);

            $this->Image($qrFile,$this->x+19,$this->y);
            unlink($qrFile);

            $qrStep = $item['elementitem'];

            $this->QrCode($qrCode,$qrStep);

            if($i != count($rows) -1) $this->AddPage();
            $i++;
        }
    }

}