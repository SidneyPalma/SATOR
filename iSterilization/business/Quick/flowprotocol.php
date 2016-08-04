<?php

namespace iSterilization\Quick;

use Smart\Utils\Report;
use Smart\Utils\Session;
use Endroid\QrCode\QrCode;

class flowprotocol extends Report {

    public function preConstruct() {
        parent::preConstruct();

        $sql = "
            select
                etl.code,
                etl.description
            from
                enumtype et
                inner join enumtypelist etl on ( etl.enumtypeid = et.id )
            where et.name = 'flowprotocol'
                and etl.isactive = 1
            order by etl.orderby";

        $this->rows = $this->getProxy()->query($sql)->fetchAll();
    }

    public function posConstruct() {
        parent::posConstruct();
    }

    public function Header() {
        $this->squareWidth = $this->getInternalW();
        $sizeColumns = array(intval($this->squareWidth / 2),intval($this->squareWidth / 2));
        $this->sizeColumns = $this->scaleCalc(array_sum($sizeColumns),intval($this->squareWidth),$sizeColumns);

        $sw = intval($this->squareWidth / 10);
        $module = current(explode( '\\', __NAMESPACE__ ));
        $this->setLogoTipo($module,12,13,15,15);

        $this->SetFont('Arial', '', 16);
        $this->Cell($sw * 1.0,4, '',0,0,'L');
        $this->Cell($sw * 9.0,4, utf8_decode($module),0,1,'L');
        $this->SetFont('Arial', '', 12);
        $this->Cell($sw * 1.0,7, '',0,0,'L');
        $this->Cell($sw * 9.0,7, utf8_decode("Mensagens de Leitura"),0,1,'L');
        $this->Ln(4);

        $this->SetLineWidth(.2);
        $this->Cell($this->squareWidth,3, '','T',1,'C');
    }

    public function Detail() {
        $posY = 50;
        $tempDir = __DIR__;
        $qrCode = new QrCode();
        $colorFore = array('r' => 0, 'g' => 0, 'b' => 0, 'a' => 0);
        $colorBack = array('r' => 255, 'g' => 255, 'b' => 255, 'a' => 0);

        $lineColor = 1;

        //$this->getHeaderColumns();

        while(list(, $item) = each($this->rows)) {
            extract($item);

            $qrFile = "{$tempDir}{$code}.png";

            $qrCode->setText($code)
                ->setSize(70)
                ->setPadding(10)
                ->setErrorCorrection('high')
                ->setForegroundColor($colorFore)
                ->setBackgroundColor($colorBack)
                ->setImageType(QrCode::IMAGE_TYPE_PNG);

            $qrCode->render($qrFile);
            $this->Image($qrFile,50,$posY);
            unlink($qrFile);
            $posY += 30;
        }
    }

    public function Footer() {
        $this->loadFooter($this->getInternalW(),true);
    }

}