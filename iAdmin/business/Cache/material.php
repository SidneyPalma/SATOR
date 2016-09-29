<?php

namespace iAdmin\Cache;

use Smart\Utils\Session;
use iAdmin\Model\material as Model;

class material extends \Smart\Data\Cache {

    public function selectLike(array $data) {
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $proxy = $this->getStore()->getProxy();
        $total = isset($data['totalresults']) ? $data['totalresults'] : 10;

        $sql = "
            SELECT top $total  
                ib.name,
                ib.description,
                ib.barcode,
                ib.itembasetype,
                ib.proprietaryid,
                ib.manufacturerid,
                ib.dateacquisition,
                ib.patrimonialcode,
                ib.registrationanvisa,
                ib.isactive,
                ib.itemgroup,
                dbo.getEnum('itemsize',m.itemsize) as itemsizedescription,
                dbo.getEnum('itemgroup',ib.itemgroup) as itemgroupdescription,
                a.materialboxname,
                a.colorschema,
                m.*,
                dbo.getEnum('materialstatus',m.materialstatus) as materialstatusdescription,
                pk.name as packingname,
                pt.name as proprietaryname,
                mf.name as manufacturername
            FROM
                itembase ib
                inner join material m on ( m.id = ib.id )
                inner join packing pk on ( pk.id = m.packingid )
                inner join proprietary pt on ( pt.id = ib.proprietaryid )
                inner join manufacturer mf on ( mf.id = ib.manufacturerid )
                outer apply (
                    SELECT
                        mb.name as materialboxname,
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
                    FROM
                        materialbox mb
                    inner join materialboxitem mbi on ( 
                                    mbi.materialboxid = mb.id
                                AND mbi.materialid = m.id
                                AND mbi.boxitemstatus = 'A' )
                    inner join itembase ibt on ( ibt.id = mbi.materialid )
                ) a
            WHERE ib.name COLLATE Latin1_General_CI_AI LIKE :name
               OR ib.barcode COLLATE Latin1_General_CI_AI LIKE :barcode
               OR ib.description COLLATE Latin1_General_CI_AI LIKE :description";

        try {
            $pdo = $proxy->prepare($sql);

            $query = "%{$query}%";

            $pdo->bindValue(":name", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":barcode", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":description", $query, \PDO::PARAM_STR);

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

    public function selectCode(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            SELECT
                ib.name,
                ib.description,
                ib.barcode,
                ib.itembasetype,
                coalesce(ib.resultfield,'{}') as resultfield,
                ib.proprietaryid,
                ib.manufacturerid,
                ib.dateacquisition,
                ib.patrimonialcode,
                ib.registrationanvisa,
                ib.isactive,
                ib.itemgroup,
                dbo.getEnum('itemsize',m.itemsize) as itemsizedescription,
                dbo.getEnum('itemgroup',ib.itemgroup) as itemgroupdescription,
                dbo.binary2base64(ib.filedata) as filedata,
                ib.fileinfo,
                materialboxname = (
                  SELECT TOP 1
                    mb.name
                  FROM
                    materialbox mb
                    inner join materialboxitem mbi on ( 
                                            mbi.materialboxid = mb.id
                                        AND mbi.materialid = m.id
                                        AND mbi.boxitemstatus = 'A' )
                    inner join itembase ibt on ( ibt.id = mbi.materialid )
                ),
                m.*,
                dbo.getEnum('materialstatus',m.materialstatus) as materialstatusdescription,
                pk.name as packingname,
                pt.name as proprietaryname,
                mf.name as manufacturername
            FROM
                itembase ib
                inner join material m on ( m.id = ib.id )
                inner join packing pk on ( pk.id = m.packingid )
                inner join proprietary pt on ( pt.id = ib.proprietaryid )
                inner join manufacturer mf on ( mf.id = ib.manufacturerid )
            WHERE ib.id = :id";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":id", $query, \PDO::PARAM_INT);

            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function insertCopy(array $data) {
        $id = $data['id'];
        $username = $this->session->username;
        $proxy = $this->getStore()->getProxy();


        $sql = "
            SET XACT_ABORT ON
            SET NOCOUNT ON
            SET ANSI_NULLS ON
            SET ANSI_WARNINGS ON
            
            declare
                @nw int,
                @id int = {$id},
                @barcode varchar(20), 
                @error_code int = 0, 
                @error_text nvarchar(200),
                @username varchar(80) = '{$username}';
            
            BEGIN TRY
            
                BEGIN TRAN setCloneItem;
            
                    insert into itembase
                        (
                            name, barcode, description, resultfield, proprietaryid,
                            manufacturerid, dateacquisition, patrimonialcode,
                            registrationanvisa, itembasetype, filedata, fileinfo, isactive, itemgroup
                        )
                    select
                        ib.name + ' (clone)', 
                        '(clone)' as barcode,
                        ib.description, 
                        ib.resultfield, 
                        ib.proprietaryid, 
                        ib.manufacturerid, 
                        ib.dateacquisition, 
                        ib.patrimonialcode, 
                        ib.registrationanvisa, 
                        ib.itembasetype, 
                        ib.filedata, 
                        ib.fileinfo, 
                        ib.isactive, 
                        ib.itemgroup
                    from
                        itembase ib
                    where ib.id = @id;
            
                    set @nw = ( select @@identity );
            
                    insert into material
                        (
                            id, materialstatus, packingid, numberproceedings, 
                            datedisposal, isconsigned, itemsize, itemlength, 
                            itemcubiclength, cloned, clonedate, cloneusername
                        )
                    select
                        @nw as id,
                        m.materialstatus, 
                        m.packingid, 
                        m.numberproceedings, 
                        m.datedisposal, 
                        m.isconsigned, 
                        m.itemsize, 
                        m.itemlength, 
                        m.itemcubiclength, 
                        1 as cloned, 
                        getdate() as clonedate, 
                        @username as cloneusername
                    from
                        material m
                    where m.id = @id;
            
                    set @barcode = 'C' + dbo.getLeftPad(7,'0',@nw);
            
                    update itembase set barcode = @barcode where id= @nw;
            
                    insert into itembaseservicetype ( itembaseid, servicetype )
                    select
                        @nw as itembaseid, servicetype
                    from
                        itembaseservicetype ist
                    where ist.itembaseid = @id;
            
                    insert into materialcycle ( materialid, cycleid )
                    select
                        @nw as materialid, cycleid
                    from
                        materialcycle mc
                    where mc.materialid = @id;
            
                    insert into materialtypeflow ( materialid, sterilizationtypeid, prioritylevel )
                    select
                        @nw as materialid, sterilizationtypeid, prioritylevel
                    from
                        materialtypeflow mtf
                    where mtf.materialid = @id;
            
                COMMIT TRAN setCloneItem;
            
                set @error_code = 0;
                set @error_text = 'Atualizacoes realizadas com sucesso!';
            
            END TRY
            
            BEGIN CATCH
                ROLLBACK TRAN setCloneItem;
                set @error_code = error_number();
                set @error_text = ' # ' +error_message() + ', ' + cast(error_line() as varchar);
            END CATCH
            
            select @nw as id, @error_code as error_code, @error_text as error_text;";

        try {
            $rows = $proxy->query($sql)->fetchAll();

            $message = $rows[0]['error_text'];
            $success = intval($rows[0]['error_code']) == 0;

            if($success == true) {
                $data['query'] = $rows[0]['id'];
                $this->selectCode($data);
                return $this->selectCode($data);
            }

            self::_setRows($rows);
            self::_setText($message);
            self::_setSuccess($success);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectBox(array $data) {
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $proxy = $this->getStore()->getProxy();
        $materialboxid = isset($data['materialboxid']) ? $data['materialboxid'] : null;
        $sql = "
            SELECT
                ib.name,
                ib.description,
                ib.barcode,
                ib.itembasetype,
                ib.proprietaryid,
                ib.manufacturerid,
                ib.dateacquisition,
                ib.patrimonialcode,
                ib.registrationanvisa,
                ib.isactive,
                ib.itemgroup,
                dbo.getEnum('itemsize',m.itemsize) as itemsizedescription,
                dbo.getEnum('itemgroup',ib.itemgroup) as itemgroupdescription,
                materialboxname = (
                  SELECT TOP 1
                    mb.name
                  FROM
                    materialbox mb
                    inner join materialboxitem mbi on ( 
                                            mbi.materialboxid = mb.id
                                        AND mbi.materialid = m.id
                                        AND mbi.boxitemstatus = 'A' )
                    inner join itembase ibt on ( ibt.id = mbi.materialid )
                ),
                m.*,
                --ms.name as materialstatusname,
                dbo.getEnum('materialstatus',m.materialstatus) as materialstatusdescription,
                pk.name as packingname,
                pt.name as proprietaryname,
                mf.name as manufacturername
            FROM
                itembase ib
                inner join material m on ( m.id = ib.id )
                --inner join materialstatus ms on ( ms.id = m.materialstatusid )
                inner join packing pk on ( pk.id = m.packingid )
                inner join proprietary pt on ( pt.id = ib.proprietaryid )
                inner join manufacturer mf on ( mf.id = ib.manufacturerid )
                inner join materialboxitem mbi on ( mbi.materialid = m.id and mbi.materialboxid = :materialboxid )
            WHERE ib.name COLLATE Latin1_General_CI_AI LIKE :name
               OR ib.barcode COLLATE Latin1_General_CI_AI LIKE :barcode
               OR ib.description COLLATE Latin1_General_CI_AI LIKE :description";

        try {
            $pdo = $proxy->prepare($sql);

            $query = "%{$query}%";

            $pdo->bindValue(":name", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":barcode", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":description", $query, \PDO::PARAM_STR);
            $pdo->bindValue(":materialboxid", $materialboxid, \PDO::PARAM_INT);

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