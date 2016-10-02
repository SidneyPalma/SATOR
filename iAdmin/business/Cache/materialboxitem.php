<?php

namespace iAdmin\Cache;

use iAdmin\Model\materialboxitem as Model;

class materialboxitem extends \Smart\Data\Cache {

	public function selectCode(array $data) {
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
		$proxy = $this->getStore()->getProxy();

		$sql = "
            select
                mbi.id,
                mbi.materialboxid,
                mbi.materialid,
                ib.barcode,
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

			self::_setRows($rows);
            self::_setPage($start,$limit);

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
			declare
				@barcode varchar(20) = :barcode,
				@packingid int = :packingid,
				@name varchar(80) = :name;

			select top 7
				ib.id,
				ib.name,
				ib.barcode,
				ib.description,
				mf.name as manufacturername,
                dbo.binary2base64(ib.filedata) as filedata,
                ib.fileinfo
			from
				itembase ib
				inner join material m on ( m.id = ib.id and m.packingid = @packingid )
				inner join manufacturer mf on ( mf.id = ib.manufacturerid )
			where ib.id not in ( select materialid from materialboxitem where boxitemstatus = 'A' )
			  and ib.isactive = 1
              and (
                    ib.barcode = @barcode OR
                    ib.name COLLATE Latin1_General_CI_AI LIKE @name
              )";

		try {
			$pdo = $proxy->prepare($sql);

			$pdo->bindValue(":barcode", $query, \PDO::PARAM_STR);
			$pdo->bindValue(":name", "%{$query}%", \PDO::PARAM_STR);
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