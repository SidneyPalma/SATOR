<?php

namespace iAdmin\Quick;

use Smart\Data\Proxy;
use Smart\Setup\Start;
use Smart\Utils\Report;
use Smart\Utils\Session;

class MovimentEnter extends Report {

    private $proxy;

    public function preConstruct() {
        $this->post = (object) self::decodeUTF8($_REQUEST);

        $id = $this->post->id;

        $sizeColumns = array(20,20,20,20,15,15);
        $this->sizeColumns = $this->scaleCalc(array_sum($sizeColumns),intval($this->getInternalW()),$sizeColumns);
        $this->squareWidth = intval($this->getInternalW() / 12);

        $this->proxy = new Proxy(array(Start::getConnnect(), Start::getUserName(), Start::getPassWord()));

        $sql = "
            select
                m.id,
                m.movimentdate, 
                m.username, 
                dbo.getEnum('movimenttype',m.movimenttype) as movimenttypedescription,
                m.documentnumber, 
                dbo.getEnum('documenttype',m.documenttype) as documenttypedescription,             
                dbo.getEnum('movimentstatus',m.movimentstatus) as movimentstatusdescription,
                i.name as inputname,
                dbo.getEnum('presentation',mi.presentation) as presentationdescription,
                mi.quantity, 
                mi.datevalidity, 
                mi.lotpart, 
                mi.isactive, 
                mi.updated
            from
                moviment m
                inner join movimentitem mi on ( mi.movimentid = m.id )
                inner join input i on ( i.id = mi.inputid )
            where m.id = :id
            order by mi.movimentid";

        $pdo = $this->proxy->prepare($sql);
        $pdo->bindValue(":id", $id, \PDO::PARAM_INT);

        $pdo->execute();
        $this->rows = $pdo->fetchAll();
    }

    public function posConstruct() {
        $this->AliasNbPages();
        $this->AddFont('LucidaSans-Typewriter','','LTYPE.php');
        $this->setAllMarginPage(12);
        $this->AddPage();
        $this->Detail();
        $this->Output("MovimentEnter.pdf", "I");
    }

    public function setAllMarginPage($margin) {
        $this->SetMargins($margin,$margin + 2);
        $this->SetAutoPageBreak(false,$margin);
    }

    public function Header() {
        $this->squareWidth = intval($this->getInternalW() / 6);

        $id = $this->rows[0]['id'];
        $movimentdate = $this->rows[0]['movimentdate'];
        $movimenttypedescription = $this->rows[0]['movimenttypedescription'];
        $documenttypedescription = $this->rows[0]['documenttypedescription'];
        $movimentstatusdescription = $this->rows[0]['movimentstatusdescription'];

        $date = new \DateTime($movimentdate);
        $id = str_pad($id, 6, '0', STR_PAD_LEFT);

        $this->configStyleHeader(14);
        $this->Cell($this->getInternalW(),6, utf8_decode("Movimento de $movimenttypedescription N# $id"),0,1,'C',false);
        $this->configStyleHeader(10);
        $this->Cell($this->getInternalW(),6, 'Data: '. $date->format('d/m/Y'),0,1,'C',false);

        $this->SetLineWidth(.2);
        $this->Cell($this->getInternalW(),3, '','B',1,'C');
        $this->Ln(4);

        $this->SetFont('Arial', '', 10);
        $this->Cell($this->squareWidth,7,'Documento:',0,0,'L',0);
        $this->configStyleHeader(10);
        $this->Cell($this->squareWidth*4,7,"$documenttypedescription - $movimentstatusdescription",0,1,'L',0);
        $this->Ln(1);
    }

    public function getHeaderColumns() {
        $sw = $this->squareWidth;

        $this->SetFont('Arial', '', 9);
        $this->SetFillColor(245, 242, 198);

        $this->Cell($sw + $sw,7,'Insumo',1,0,'L',1);
        $this->Cell($sw,7,'Quantidade',1,0,'R',1);
        $this->Cell($sw * 1.0,7,'Lote',1,0,'L',1);
        $this->Cell($sw * 1.0,7,'Validade',1,0,'C',1);
        $this->Cell($sw * 0.5,7,'Update',1,0,'C',1);
        $this->Cell($sw * 0.5,7,'Status',1,1,'C',1);
    }

    public function Detail() {
        $sw = $this->squareWidth;

        $lineColor = 1;

        $this->getHeaderColumns();

        while(list(, $item) = each($this->rows)) {
            extract($item);

            $date = new \DateTime($datevalidity);

            //Control line color
            $lineColor = ($lineColor == 0) ? 1 : 0;

            //Config Style Details
            $this->configStyleDetail();
            $this->SetFont('LucidaSans-Typewriter', '', 8);

            //Print Datas
            $this->Cell($sw * 2,5,"$inputname - $presentationdescription",0,0,'L',$lineColor);
            $this->Cell($sw,5,number_format($quantity, 3, ',', '.'),0,0,'R',$lineColor);
            $this->Cell($sw * 1.0,5,$lotpart,0,0,'L',$lineColor);
            $this->Cell($sw * 1.0,5,$date->format('d/m/Y'),0,0,'C',$lineColor);
            $this->Cell($sw * 0.5,5,$updated,0,0,'C',$lineColor);
            $this->Cell($sw * 0.5,5,$isactive,0,1,'C',$lineColor);
        }

        $this->SetLineWidth(.2);
        $this->Cell($this->getInternalW(),3, '','T',1,'C');

        $this->Ln(20);
        $this->SetFont('Arial', '', 7);
        $this->Cell($sw * 2,4, utf8_decode("Lançado por"),'T',0,'C');
        $this->Cell($sw * 2,3, '',0,0,'C');
        $this->Cell($sw * 2,4, utf8_decode("Encerrado por"),'T',1,'C');
    }

    public function Footer() {
        $this->loadFooter($this->getInternalW(),false);
    }

}