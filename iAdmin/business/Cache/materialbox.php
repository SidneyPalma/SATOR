<?php

namespace iAdmin\Cache;

use Smart\Utils\Session;
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
            
                    insert into 
                        materialbox ( name, barcode, restriction, itemsize, statusbox, packingid, requirepatient )
                    select
                        '(clone) ' + mb.name, 
                        '(clone)' as barcode,
                        mb.restriction, 
                        mb.itemsize, 
                        mb.statusbox, 
                        mb.packingid, 
                        mb.requirepatient
                    from
                        materialbox mb
                    where mb.id = @id;
            
                    set @nw = ( select @@identity );            
                       
                    insert into materialboxtarge ( materialboxid, targecolorid, targeorderby )
                    select
                        @nw as materialboxid, mbi.targecolorid, mbi.targeorderby
                    from
                        materialboxtarge mbi
                    where mbi.materialboxid = @id;            
            
                    set @barcode = 'K' + dbo.getLeftPad(7,'0',@nw);
            
                    update materialbox set barcode = @barcode where id= @nw;            
            
                COMMIT TRAN setCloneItem;
            
                set @error_code = 0;
                set @error_text = 'Atualizacoes realizadas com sucesso!';
            
            END TRY
            
            BEGIN CATCH
                ROLLBACK TRAN setCloneItem;
                set @error_code = error_number();
                set @error_text = ' # ' + error_message() + ', ' + cast(error_line() as varchar);
            END CATCH
            
            select @nw as id, @error_code as error_code, @error_text as error_text;";

        try {
            $proxy->beginTransaction();

            $rows = $proxy->query($sql)->fetchAll();

            $message = $rows[0]['error_text'];
            $success = intval($rows[0]['error_code']) == 0;

            if($success == true) {
                $proxy->commit();
                $data['query'] = $rows[0]['id'];
                $this->selectCode($data);
                return $this->selectCode($data);
            }

            self::_setRows($rows);
            self::_setText($message);
            self::_setSuccess($success);

            if($success == false) {
                throw new \PDOException($rows[0]['error_text']);
            }
        } catch ( \PDOException $e ) {
            $proxy->rollBack();
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

}