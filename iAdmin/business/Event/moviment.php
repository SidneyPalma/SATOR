<?php

namespace iAdmin\Event;

use Smart\Utils\Session;

class moviment extends \Smart\Data\Event {

    /**
     * @param \iAdmin\Model\moviment $model
     */
    public function preInsert( \iAdmin\Model\moviment &$model ) {
        Session::hasProfile('','');
        $username = $this->session->username;
        $model->set('username',$username);
        $model->set('movimentstatus','A');
    }

    /**
     * @param \iAdmin\Model\moviment $model
     */
    public function posInsert( \iAdmin\Model\moviment &$model ) {

    }

    /**
     * @param \iAdmin\Model\moviment $model
     */
    public function preUpdate( \iAdmin\Model\moviment &$model ) {
        Session::hasProfile('','');

        $this->valUpdate($model);
    }

    /**
     * Validar update Encerramento
     * @param $model
     * @return \Smart\Common\Traits\json
     */
    public function valUpdate($model) {
        $id = $model->getId();
        $statusnew = $model->getMovimentstatus();

        $pdo = $this->getProxy()->prepare("select movimentstatus, movimenttype from moviment where id = :id");
        $pdo->bindValue(":id", $id, \PDO::PARAM_INT);

        $pdo->execute();
        $rows = $pdo->fetchAll();
        $statusold = $rows[0]['movimentstatus'];
        $movimenttype = $rows[0]['movimenttype'];

        if( $statusold == 'E' ) {
            throw new \PDOException("Este movimento não pode ser modificado pois está Encerrado!");
        }

        if(($statusnew == 'E') && ($statusold != 'F')) {
            throw new \PDOException("Este movimento não pode ser encerrado pois não está Fechado!");
        }

        if(($statusnew == 'E') && ($statusold == 'F')) {
            $sql = "
                select
                    mi.id,
                    m.cmeareasid,
                    mi.movimentid,
                    mi.inputid,
                    mi.presentation,
                    mi.quantity,
                    mi.datevalidity,
                    mi.lotpart
                from
                    movimentitem mi
                    inner join moviment m on ( m.id = mi.movimentid )
                where mi.movimentid = :id
                  and mi.isactive = 1
                  and mi.updated = 0";

            $pdo = $this->getProxy()->prepare($sql);
            $pdo->bindValue(":id", $id, \PDO::PARAM_INT);

            $pdo->execute();
            $rows = $pdo->fetchAll();

            if($movimenttype == 'S') $this->setUpdateLeave($rows);
            if($movimenttype == 'E') $this->setUpdateEnter($rows);
        }
    }

    public function setUpdateLeave($rows) {
        $sql = "
            declare
                @id int= :id,
                @hasbatch bit = 0,
                @rowcount int = 0,
                @inputid int  = :inputid,
                @cmeareasid int = :cmeareasid,
                @movimentid int = :movimentid, 
                @lotpart varchar(20) 	= :lotpart,
                @quantity decimal(12,3) = :quantity,
                @presentation char(03)  = :presentation,
                @datevalidity char(10)  = :datevalidity,
                @error_message nvarchar(200);
            
                set @error_message = 'Thats ok!';
            
            BEGIN TRANSACTION
            
            SET NOCOUNT ON;
            
            BEGIN TRY
            
                -- possui lote e validade
                select 
                    @hasbatch = i.hasbatch
                from input i where i.id = @inputid;
            
                if( @hasbatch = 1)
                begin
                    update
                        cmeareasstock
                    set
                        lotamount = coalesce(lotamount,0) + coalesce(@quantity,0)
                    where inputid = @inputid
                      and cmeareasid = @cmeareasid
                      and presentation = @presentation
                      and datevalidity = @datevalidity
                      and lotpart = @lotpart;
            
                    if(@rowcount = 0)
                    begin
                        insert 
                            cmeareasstock 
                            ( inputid, cmeareasid, presentation, lotamount, datevalidity, lotpart )
                        values
                            ( @inputid, @cmeareasid, @presentation, coalesce(@quantity,0), @datevalidity, @lotpart );
                            
                        set @rowcount = @@rowcount;
                    end            

                    set @rowcount = @@rowcount;            

                    update
                        inputstock 
                    set
                        lotamount = coalesce(lotamount,0) - coalesce(@quantity,0)
                    where inputid = @inputid
                      and presentation = @presentation
                      and datevalidity = @datevalidity
                      and lotpart = @lotpart;
           
                    set @rowcount = @rowcount + @@rowcount;
                                                   
                    if(@rowcount != 0)
                    begin
                        update movimentitem set updated = 1 where id = @id;
                        update moviment set movimentstatus = 'E' where id = @movimentid;
                    end
                end
            
                if( @hasbatch = 0)
                begin
                    update
                        cmeareasstock
                    set
                        lotamount = coalesce(lotamount,0) + coalesce(@quantity,0)
                    where inputid = @inputid
                      and cmeareasid = @cmeareasid
                      and presentation = @presentation;
            
                    if(@rowcount = 0)
                    begin
                        insert 
                            cmeareasstock 
                            ( inputid, cmeareasid, presentation, lotamount )
                        values
                            ( @inputid, @cmeareasid, @presentation, coalesce(@quantity,0) );
                            
                        set @rowcount = @@rowcount;
                    end            

                    set @rowcount = @@rowcount;                
                
                    update
                        inputstock 
                    set
                        lotamount = coalesce(lotamount,0) - coalesce(@quantity,0)
                    where inputid = @inputid
                      and presentation = @presentation;
            
                    set @rowcount = @rowcount + @@rowcount;
            
                    if(@rowcount != 0)
                    begin
                        update movimentitem set updated = 1 where id = @id;
                        update moviment set movimentstatus = 'E' where id = @movimentid;
                    end                    
            
                end

                COMMIT TRANSACTION

            END TRY
            
            BEGIN CATCH
                set @error_message = error_message();
                ROLLBACK TRANSACTION
            END CATCH            
            
            SELECT @rowcount as error, @error_message as message";

        while(list(, $item) = each($rows)) {
            extract($item);

            $pdo = $this->getProxy()->prepare($sql);
            $pdo->bindValue(":id", $id, \PDO::PARAM_INT);
            $pdo->bindValue(":inputid", $inputid, \PDO::PARAM_INT);
            $pdo->bindValue(":cmeareasid", $cmeareasid, \PDO::PARAM_INT);
            $pdo->bindValue(":presentation", $presentation, \PDO::PARAM_STR);
            $pdo->bindValue(":quantity", $quantity, \PDO::PARAM_STR);
            $pdo->bindValue(":datevalidity", $datevalidity, \PDO::PARAM_STR);
            $pdo->bindValue(":lotpart", $lotpart, \PDO::PARAM_STR);
            $pdo->bindValue(":movimentid", $movimentid, \PDO::PARAM_INT);

            $pdo->execute();
            $data = $pdo->fetchAll();

            if($data[0]['error'] == 0) {
                throw new \PDOException($data[0]['message']);
                break;
            }
        }

    }

    public function setUpdateEnter ($rows) {
        $sql = "
            declare
                @id int= :id,
                @hasbatch bit = 0,
                @rowcount int = 0,
                @inputid int= :inputid, 
                @movimentid int = :movimentid, 
                @presentation char(03)  = :presentation,
                @quantity decimal(12,3) = :quantity,
                @datevalidity char(10)  = :datevalidity,
                @lotpart varchar(20) 	= :lotpart,
                @error_message nvarchar(200);
            
                set @error_message = 'Thats ok!';
            
            BEGIN TRANSACTION
            
            SET NOCOUNT ON;
            
            BEGIN TRY
            
                -- possui lote e validade
                select 
                    @hasbatch = i.hasbatch
                from input i where i.id = @inputid;
            
                if( @hasbatch = 1)
                begin
                    update
                        inputstock 
                    set
                        lotamount = coalesce(lotamount,0) + coalesce(@quantity,0)
                    where inputid = @inputid
                      and presentation = @presentation
                      and datevalidity = @datevalidity
                      and lotpart = @lotpart;
            
                    set @rowcount = @@rowcount;
            
                    if(@rowcount = 0)
                    begin
                        insert 
                            inputstock 
                            ( inputid, presentation, lotamount, datevalidity, lotpart )
                        values
                            ( @inputid, @presentation, coalesce(@quantity,0), @datevalidity, @lotpart );
                            
                        set @rowcount = @@rowcount;
                    end

                    if(@rowcount != 0)
                    begin
                        update movimentitem set updated = 1 where id = @id;
                        update moviment set movimentstatus = 'E' where id = @movimentid;
                    end            
                end
            
                if( @hasbatch = 0)
                begin
                    update
                        inputstock 
                    set
                        lotamount = coalesce(lotamount,0) + coalesce(@quantity,0)
                    where inputid = @inputid
                      and presentation = @presentation;
            
                    set @rowcount = @@rowcount;
            
                    if(@rowcount = 0)
                    begin
                        insert 
                            inputstock 
                            ( inputid, presentation, lotamount )
                        values
                            ( @inputid, @presentation, coalesce(@quantity,0) );

                        set @rowcount = @@rowcount;
                    end
            
                    if(@rowcount != 0)
                    begin
                        update movimentitem set updated = 1 where id = @id;
                        update moviment set movimentstatus = 'E' where id = @movimentid;
                    end                    
            
                end

                COMMIT TRANSACTION

            END TRY
            
            BEGIN CATCH
                set @error_message = error_message();
                ROLLBACK TRANSACTION
            END CATCH            
            
            SELECT @rowcount as error, @error_message as message";

        while(list(, $item) = each($rows)) {
            extract($item);

            $pdo = $this->getProxy()->prepare($sql);
            $pdo->bindValue(":id", $id, \PDO::PARAM_INT);
            $pdo->bindValue(":inputid", $inputid, \PDO::PARAM_INT);
            $pdo->bindValue(":presentation", $presentation, \PDO::PARAM_STR);
            $pdo->bindValue(":quantity", $quantity, \PDO::PARAM_STR);
            $pdo->bindValue(":datevalidity", $datevalidity, \PDO::PARAM_STR);
            $pdo->bindValue(":lotpart", $lotpart, \PDO::PARAM_STR);
            $pdo->bindValue(":movimentid", $movimentid, \PDO::PARAM_INT);

            $pdo->execute();
            $data = $pdo->fetchAll();

            if($data[0]['error'] == 0) {
                throw new \PDOException($data[0]['message']);
                break;
            }
        }

    }

        /**
     * @param \iAdmin\Model\moviment $model
     */
    public function posUpdate( \iAdmin\Model\moviment &$model ) {

    }

    /**
     * @param \iAdmin\Model\moviment $model
     */
    public function preDelete( \iAdmin\Model\moviment &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iAdmin\Model\moviment $model
     */
    public function posDelete( \iAdmin\Model\moviment &$model ) {

    }

}