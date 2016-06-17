<?php

namespace iAdmin\Cache;

use iAdmin\Model\materialboxitem as Model;

class materialboxitem extends \Smart\Data\Cache {

	public function selectCode(array $data) {
		$query = $data['query'];
		$proxy = $this->getStore()->getProxy();

		$sql = "
            select
                mbi.id,
                mbi.materialboxid,
                mbi.materialid,
                ib.name as materialname
            from
                materialboxitem mbi
                inner join itembase ib on ( ib.id = mbi.materialid )
            where mbi.materialboxid = :id";

		try {
			$pdo = $proxy->prepare($sql);

			$pdo->bindValue(":id", $query, \PDO::PARAM_INT);

			$pdo->execute();
			$rows = $pdo->fetchAll();
			$recs = count($rows);
			for ($x = 0; $x <= $recs; $x++) {
				$rows[$x]['materialboxid'] = $query;
				$rows[$x]['materialname'] = ($recs != $x) ? $rows[$x]['materialname'] : 'Inserir Novo Registro';
			}

			self::_setRows($rows);

		} catch ( \PDOException $e ) {
			self::_setSuccess(false);
			self::_setText($e->getMessage());
		}

		return self::getResultToJson();
	}

}