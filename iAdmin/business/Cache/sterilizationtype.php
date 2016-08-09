<?php

namespace iAdmin\Cache;

use iAdmin\Model\sterilizationtype as Model;

class sterilizationtype extends \Smart\Data\Cache {

    /**
     * @return int
     */
    public function selectItems(array $data) {
        $query = $data['query'];

        $proxy = $this->getStore()->getProxy();

        $sql = "
            select distinct
                i.id,
                i.name,
                i.isactive,
                m.isconsigned,
                m.itemlength,
                m.itemcubiclength,
                mf.sterilizationtypeid,
                dbo.getEnum('itemgroup',m.itemgroup) as itemgroupdescription
            from
                materialtypeflow mf
                inner join material m on ( m.id = mf.materialid )
                inner join itembase i on ( i.id = m.id )
            where mf.sterilizationtypeid = :query";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":query", $query, \PDO::PARAM_INT);

            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectRules(array $data) {
        $coreflow = file_get_contents('../../resources/CoreFlowRule.json');

        return $coreflow;
    }

    public function selectShape(array $data) {
        $shapeType = $data['shapeType'];
        $proxy = $this->getStore()->getProxy();

        switch($shapeType) {
            case 'area':
                $sql = "
                    SELECT
                      a.id,
                      a.barcode,
                      a.sterilizationname as name,
                      a.description,
                      a.isactive,
                      c.isstartstate
                    FROM
                      areas a
                      inner join cmeareas c on ( c.id = a.id )
                    WHERE a.sterilizationflow = 1 order by a.orderby";
                break;
            case 'subarea':
                $sql = "
                    SELECT
                      a.id,
                      a.barcode,
                      a.sterilizationname as name,
                      a.description,
                      a.isactive
                    FROM
                      areas a
                      inner join cmesubareas s on ( s.id = a.id )
                    WHERE a.sterilizationflow = 1 order by a.orderby";
                break;
            case 'equipment':
                $sql = "
                    SELECT
                        e.id,
                        ib.barcode,
                        e.sterilizationname as name,
                        ib.description,
                        dbo.binary2base64(ib.filedata) as filedata,
                        ib.fileinfo,
                        ib.isactive
                    FROM
                      itembase ib
                      inner join equipment e on ( e.id = ib.id )
                    WHERE ib.itembasetype = 'E' and e.sterilizationflow = 1";
                break;
        }

        try {
            $rows = $proxy->query($sql)->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectFlag(array $data) {
        $proxy = $this->getStore()->getProxy();
        $filtertype = $data['filtertype'];

        $sql = "
			select
				etl.id,
				etl.code,
				0 as isactive,
				etl.description
			from
				enumtype et
				inner join enumtypelist etl on ( etl.enumtypeid = et.id )
			where et.name = 'markflagstep'
			  and etl.isactive = 1
			  and etl.filtertype like '%{$filtertype}%'
			order by etl.orderby";

        try {

            $rows = $proxy->query($sql)->fetchAll();

            self::_setRows($rows);
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function recordFlag(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "select stepflaglist as list from stepsterilization where id = :id";

        $pdo = $proxy->prepare($sql);
        $pdo->bindValue(":id", $query, \PDO::PARAM_INT);
        $pdo->execute();
        $rows = $pdo->fetchAll();

        $list = ( count($rows) != 0 ) ? $rows[0]["list"] : '';
        $flag = strlen($list) != 0 ? self::jsonToArray($list) : self::jsonToArray('[]');

        return $flag;
    }

}