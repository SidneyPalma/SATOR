<?php

namespace iAdmin\Cache;

use iAdmin\Model\materialbox as Model;

class materialbox extends \Smart\Data\Cache {

    public function selectLike(array $data) {
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
			select
                mb.*,
                dbo.getEnum('statusbox',mb.statusbox) as statusboxdescription,
                materialboxitems = (
                    SELECT
                      COUNT(mbi.id)
                    FROM
                      materialboxitem mbi
                    WHERE mbi.materialboxid = mb.id
                      AND mbi.boxitemstatus = 'A'
                ),
                colorschema = (
                    select stuff
                        (
                            (
                                select
                                    ',#' + tc.colorschema
                                from
                                    materialboxtarge mbt
                                    inner join targecolor tc on ( tc.id = mbt.targecolorid )
                                where mbt.materialboxid = mb.id
                                order by mbt.targeorderby asc
                                for xml path ('')
                            ) ,1,1,''
                        )                
                )
			from
				materialbox mb
			where mb.name like :name";

        try {
            $query = "%{$query}%";

            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":name", $query, \PDO::PARAM_STR);

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