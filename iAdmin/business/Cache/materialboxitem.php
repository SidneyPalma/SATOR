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
                ib.name as materialname,
                m.numberproceedings,
                m.isconsigned,
                p.name as proprietaryname,
                mb.statusbox
            from
                materialboxitem mbi
                inner join materialbox mb on ( mb.id = mbi.materialboxid )
                inner join itembase ib on ( ib.id = mbi.materialid )
                inner join material m on ( m.id = ib.id )
                inner join proprietary p on ( p.id = ib.proprietaryid )
            where mbi.materialboxid = :id";

		try {
			$pdo = $proxy->prepare($sql);

			$pdo->bindValue(":id", $query, \PDO::PARAM_INT);

			$pdo->execute();
			$rows = $pdo->fetchAll();

			$recs = count($rows);

			$statusbox = ($recs != 0 ) ? $rows[0]['statusbox'] : '000';

			if (in_array($statusbox, ['000','001'])) {
				for ($x = 0; $x <= $recs; $x++) {
					$rows[$x]['materialboxid'] = $query;
					$rows[$x]['materialname'] = ($recs != $x) ? $rows[$x]['materialname'] : 'Inserir Novo Registro';
				}
			}

			self::_setRows($rows);

		} catch ( \PDOException $e ) {
			self::_setSuccess(false);
			self::_setText($e->getMessage());
		}

		return self::getResultToJson();
	}

}