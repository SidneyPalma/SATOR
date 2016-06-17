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
                $sql = "SELECT a.id, a.sterilizationname as name, a.description, c.isactive FROM areas a inner join cmeareas c on ( c.id = a.id ) WHERE a.sterilizationflow = 1 order by c.orderby";
                break;
            case 'subarea':
                $sql = "SELECT a.id, a.sterilizationname as name, a.description, s.isactive FROM areas a inner join cmesubareas s on ( s.id = a.id ) WHERE a.sterilizationflow = 1 order by s.orderby";
                break;
            case 'equipment':
                $sql = "SELECT e.id, e.sterilizationname as name, i.description, i.isactive FROM itembase i inner join equipment e on ( e.id = i.id ) WHERE i.itembasetype = 'E' and e.sterilizationflow = 1";
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
        $flags = $this->recordFlag($data);
        $proxy = $this->getStore()->getProxy();

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
			order by etl.orderby";

        try {

            $rows = $proxy->query($sql)->fetchAll();
            $i = 0;
            if(count($flags) != 0) {
                foreach($rows as $data) {
                    if(in_array($data['code'], $flags)) {
                        $rows[$i]['isactive'] = 1;
                    }
                    $i++;
                }
            }

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