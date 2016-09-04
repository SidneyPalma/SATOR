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
                et.name,
                etl.code,
                etl.description,
                et.description as type
            from
                enumtype et
                inner join enumtypelist etl on ( etl.enumtypeid = et.id )
            where et.name in ('flowprotocol','unconformities')
                and etl.isactive = 1
            order by et.name, etl.orderby";

        $this->rows = $this->getProxy()->query($sql)->fetchAll();
    }

    public function Header() {
        $this->squareWidth = $this->getInternalW();

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
    }

    public function Detail() {
        $qrTemp = __DIR__;
        $qrCode = new QrCode();
        $sw = $this->squareWidth / 2;

        $i = 1;
        $line = 1;
        $typeGroup = '';

        while(list(, $item) = each($this->rows)) {
            extract($item);

            if($typeGroup == "" || $typeGroup != $type) {
                $typeGroup = $type;
                $this->configStyleHeader(16);
                $this->Cell($this->squareWidth,6, $typeGroup,0,1,'C',false);
                $this->Ln(5);
            }

            $line = $line == 0 ? 1 : 0;
            $this->configStyleHeader(12);
            $this->SetFillColor(245, 242, 198);
            $this->Cell($sw * 1.0,10,"$description",1,$line,'C',1);

            $code = ( $name == "unconformities" ) ? "SATOR-U$code" : $code;

            $qrFile = "{$qrTemp}{$code}.png";

            $qrCode->setText($code)
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

            $i++;
            if($i == 13) {
                $i = 1;
                $this->AddPage();
            }
        }
    }

}