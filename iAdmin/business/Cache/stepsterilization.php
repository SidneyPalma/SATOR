<?php

namespace iAdmin\Cache;

use iAdmin\Model\stepsterilization as Model;

class stepsterilization extends \Smart\Data\Cache {

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