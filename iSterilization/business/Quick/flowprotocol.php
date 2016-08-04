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
        $this->SetFont('Arial', '', 10);
        $this->Cell($sw * 1.0,7, '',0,0,'L');
        $this->Cell($sw * 9.0,7, utf8_decode("CME - Protocolos Operacionais"),0,1,'L');
        $this->Ln(4);

        $this->SetLineWidth(.2);
        $this->Cell($this->squareWidth,3, '','T',1,'C');
        $this->configStyleHeader(14);
        $this->Cell($this->getInternalW(),6, utf8_decode("Mensagens de Leitura"),0,1,'C',false);
    }

    public function Detail() {
        $qrTemp = __DIR__;
        $qrCode = new QrCode();
        $sw = intval($this->squareWidth / 2);
        $colorFore = array('r' => 0, 'g' => 0, 'b' => 0, 'a' => 0);
        $colorBack = array('r' => 255, 'g' => 255, 'b' => 255, 'a' => 0);

        $next = 0;
        $true = 0;
        $posY = 55;
        $posX = intval($sw/2);

        $this->Ln(5);
        $this->configStyleHeader(10);

        while(list(, $item) = each($this->rows)) {
            extract($item);

            $next++;
            $true = !($next % 2) ? 1 : 0;

            $this->Cell($sw * 1.0,10,$description,'B',$true,'C',1);
            if($true == 1) {
                $this->Cell($sw * 2.0,30,'',0,$true,'L',0);
            }

            $qrFile = "{$qrTemp}{$code}.png";

            $qrCode->setText($code)
                ->setSize(70)
                ->setPadding(10)
                ->setErrorCorrection('high')
                ->setForegroundColor($colorFore)
                ->setBackgroundColor($colorBack)
                ->setImageType(QrCode::IMAGE_TYPE_PNG)
                ->render($qrFile);

            $posX = ($true == 1) ? (intval($sw/2)+$sw) : $posX;

            $this->Image($qrFile,$posX,$posY);
            $posX = intval($sw/2);
            $posY += ($true == 1) ? 40 : 0;
            unlink($qrFile);
        }
    }

    public function Footer() {
        $this->loadFooter($this->getInternalW(),true);
    }

}