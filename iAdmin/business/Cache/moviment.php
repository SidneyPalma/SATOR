<?php

namespace iAdmin\Cache;

use iAdmin\Model\moviment as Model;

class moviment extends \Smart\Data\Cache {

    public function selectLike_(array $data) {
        $p = $f = array();
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $params = json_decode($data['params']);
        $proxy = $this->getStore()->getProxy();

        // set params
        foreach ($params as $key => $value) {
            $p[] = "$value LIKE :$value";
        }

        $sql = "
            SELECT
                m.*,
                a.name as cmeareasname
            FROM
                moviment m
                left join cmeareas ca on ( ca.id = m.cmeareasid )
                left join areas a on ( a.id = ca.id )
            WHERE ( " . implode(' OR ', $p) . " )";

        try {
            $pdo = $proxy->prepare($sql);

            $query = "%{$query}%";

            foreach ($params as $key => $value) {
                $pdo->bindValue(":$value", $query, \PDO::PARAM_STR);
            }

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

    public function selectInputEnter(array $data) {
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                i.id,
                i.name,
                i.hasstock,
                i.hasbatch,
                m.name as manufacturername
            from
                input i
                inner join manufacturer m on ( m.id = i.manufacturerid )
            where i.name like :name
              and i.isactive = 1";

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
                i.name,
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
            where i.name like :name
              and it.lotamount > 0
              and it.datevalidity >= getdate()";

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