<?php

namespace iSterilization\Cache;

use iSterilization\Model\armorymovementitem as Model;

class armorymovementitem extends \Smart\Data\Cache {

    public function selectItem(array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            declare
                @id int = :id;
                    
            select
                ami.*,
                fp.barcode,
                t.materialname,
                dbo.getEnum('outputtype',ami.outputtype) as outputtypedescription
                dbo.getEnum('armorylocal',ami.armorylocal) as armorylocaldescription
            from
                armorymovementitem ami
                inner join flowprocessingstep fps on ( fps.id = ami.flowprocessingstepid )
                inner join flowprocessing fp on ( fp.id = fps.flowprocessingid )
                cross apply (
                    select 
                        coalesce(ta.name,tb.name) as materialname
                    from 
                        flowprocessing a
                        outer apply (
                            select
                                mb.name
                            from
                                materialbox mb
                            where mb.id = a.materialboxid
                        ) ta
                        outer apply (
                            select top 1
                                ib.name
                            from
                                flowprocessingstep b
                                inner join flowprocessingstepmaterial c on ( c.flowprocessingstepid = b.id )
                                inner join itembase ib on ( ib.id = c.materialid )
                            where b.flowprocessingid = fp.id
                              and b.id < fps.id
                              and ( b.stepflaglist like '%001%' or b.stepflaglist like '%019%' )
                        ) tb
                    where a.id = fp.id
                ) t
            where ami.armorymovementid = @id";

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

}