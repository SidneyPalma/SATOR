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
                mb.statusbox,
                mbi.boxitemstatus
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

			if (in_array($statusbox, ['000'])) {
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

	public function selectLike(array $data) {
		$query = $data['query'];
		$start = $data['start'];
		$limit = $data['limit'];
		$packingid = $data['packingid'];
		$proxy = $this->getStore()->getProxy();

		$sql = "
			select
				ib.id,
				ib.name
			from
				itembase ib
				inner join material m on ( m.id = ib.id and m.packingid = :packingid )
			where ib.id not in ( select materialid from materialboxitem where boxitemstatus = 'A' )
			  and ib.name like :name";

		try {
			$query = "%{$query}%";

			$pdo = $proxy->prepare($sql);

			$pdo->bindValue(":name", $query, \PDO::PARAM_STR);
			$pdo->bindValue(":packingid", $packingid, \PDO::PARAM_INT);

			$pdo->execute();
			$rows = $pdo->fetchAll();

			self::_setRows($rows);

		} catch ( \PDOException $e ) {
			self::_setSuccess(false);
			self::_setText($e->getMessage());
		}

		self::_setPage($start, $limit);
		return self::getResultToJson();
	}

}