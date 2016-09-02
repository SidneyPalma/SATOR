<?php

namespace iAdmin\Quick;

use Smart\Utils\Report;
use Smart\Utils\Session;
use Endroid\QrCode\QrCode;

class exceptionbyflow extends Report {
    protected $col = 0; // Current column
    protected $y0;

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
        $this->Cell($this->squareWidth,6, "$name v.$version",0,1,'C',false);
        $this->Ln(5);
        $this->y0 = $this->GetY();
    }

    public function SetCol($col) {
        // Set position at a given column
        $this->col = $col;
        $x = 10+$col*65;
        $this->SetLeftMargin($x + 7);
        $this->SetX($x);
    }

    public function AcceptPageBreak() {
        // Method accepting or not automatic page break
        if($this->col<2) {
            // Go to next column
            $this->SetCol($this->col+1);
            // Set ordinate to top
            $this->SetY($this->y0);
            // Keep on page
            return false;
        } else {
            // Go back to first column
            $this->SetCol(0);
            // Page break
            return true;
        }
    }

    public function Footer() {
    }

    public function Detail() {
        $qrTemp = __DIR__;
        $qrCode = new QrCode();
        $sw = intval($this->squareWidth / 4);
        $flow = self::decodeUTF8(self::jsonToArray($this->rows->dataflowstep));

        $this->SetLeftMargin($this->lMargin + 5);

        $i = 0;
        $list = [];
        foreach ($flow as $item) {
            if(strlen($item['equipmentid']) != 0) {
                $list[$i]['barcodestep'] = $item['barcode'];
                $list[$i]['elementstep'] = $item['steplevel'];
                $list[$i]['elementname'] = $item['elementname'];
                $list[$i]['equipmentid'] = $item['equipmentid'];
                $i++;
            }
        }

        $this->configStyleHeader(12);

        $list = self::sorterArray($list,'elementstep');

        for ($i; $i<24; $i++) {
            $list[$i]['barcodestep'] = '';
            $list[$i]['elementname'] = '';
        }

        foreach ($list as $item) {
            $barcodestep = $item['barcodestep'];
            $elementname = $item['elementname'];

            $this->Cell($sw * 1.0,10,$elementname,1,1,'C',1);

            if(strlen($barcodestep) != 0) {
                $this->SetY($this->y+5);

                $qrFile = "{$qrTemp}{$barcodestep}.png";

                $qrCode
                    ->setText($barcodestep)
                    ->setSize(30)
                    ->setPadding(0)
                    ->setErrorCorrection('high')
                    ->setImageType(QrCode::IMAGE_TYPE_PNG)
                    ->render($qrFile);

                $this->Image($qrFile,$this->x+19,$this->y);
                unlink($qrFile);

                $this->SetY($this->y-5);
            }

            $this->Cell($sw * 1.0,20,'',1,1,'C',0);
        }
    }

}