<?php

namespace iAdmin\Cache;

use iAdmin\Model\moviment as Model;

class moviment extends \Smart\Data\Cache {

    public function selectInputEnter(array $data) {
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                ib.id,
                ib.name,
                i.hasstock,
                i.hasbatch,
                m.name as manufacturername
            from
                input i
                inner join itembase ib on ( ib.id = i.id )
                inner join manufacturer m on ( m.id = ib.manufacturerid )
            where ib.name like :name
              and ib.isactive = 1";

        try {
            $pdo = $proxy->prepare($sql);

            $query = "%{$query}%";

            $pdo->bindValue(":name", $query, \PDO::PARAM_STR);

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

    public function selectInputLeave(array $data) {
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                it.id,
                ib.name,
                it.inputid,
                lotamount = (
                    select
                        coalesce(it.lotamount - mi.quantity,0)
                    from
                        movimentitem mi
                        inner join moviment m on ( 
                                m.movimenttype = 'S' and 
                                m.movimentstatus != 'E' )
                    where mi.inputid = it.inputid
                      and mi.lotpart = it.lotpart
                      and mi.datevalidity = it.datevalidity
                      and mi.presentation = it.presentation
                      and mi.updated = 0
                ),
                it.lotpart,
                it.datevalidity,
                it.lotpart as clonelotpart,
                it.datevalidity as clonedatevalidity,
                it.presentation,
                dbo.getEnum('presentation',it.presentation) as presentationdescription
            from
                inputstock it
                inner join input i on ( i.id = it.inputid )
                inner join itembase ib on ( ib.id = i.id )
            where ib.name like :name
              and it.lotamount > 0
              and convert(varchar(10),it.datevalidity, 106) >= convert(varchar(10),getdate(),106)";

        try {
            $pdo = $proxy->prepare($sql);

            $query = "%{$query}%";

            $pdo->bindValue(":name", $query, \PDO::PARAM_STR);

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

    public function selectInputPresentation(array $data) {
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $inputid = $data['inputid'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                ip.acronym,
                ip.measurebase,
                etl.code as presentation,
                etl.description + ' (' + etl.filtertype + ')' as presentationdescription
            from
                enumtype et
                inner join enumtypelist etl on ( etl.enumtypeid = et.id )
                inner join inputpresentation ip on ( ip.presentation = etl.code and ip.inputid = :inputid)
            where et.name = 'presentation'
              and etl.description like :name 
            order by etl.orderby";

        try {
            $pdo = $proxy->prepare($sql);

            $query = "%{$query}%";

            $pdo->bindValue(":name", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":inputid", $inputid, \PDO::PARAM_STR);

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

}