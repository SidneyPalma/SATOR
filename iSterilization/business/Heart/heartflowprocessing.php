<?php

namespace iSterilization\Heart;

use Smart\Setup\Start;
use Smart\Common\Traits as Traits;

class heartflowprocessing extends \Smart\Data\Proxy {
    use Traits\TuserHandler;

    public function __construct() {
        $this->submit = $_POST;
        $pwd = Start::getPassWord();
        $usr = Start::getUserName();
        $dns = Start::getConnnect();

        $link = array($dns, $usr, $pwd);

        parent::__construct($link);
    }

    public function callAction() {
        $method = $this->submit['method'];
        return method_exists($this, $method) ? call_user_func(array($this, $method), $this->submit) : $this->UNEXPECTED_COMMAND;
    }

    /**
     * @param \iSterilization\Model\flowprocessing $model
     */
    public function preInsert( $model ) {
        $sterilizationtypeid = $model->getSterilizationtypeid();

        $pdo = $this->prepare("select authenticate from sterilizationtype where id = :sterilizationtypeid");
        $pdo->bindValue(":sterilizationtypeid", $sterilizationtypeid, \PDO::PARAM_INT);

        $pdo->execute();
        $rows = $pdo->fetchAll();
        $authenticate = $rows[0]['authenticate'];

        if(intval($authenticate) == 0) {
            throw new \PDOException('<b>O Fluxo</b> selecionado para esta leitura <b>Não Está Autenticado!</b>');
        }
    }

    /**
     * @param \iSterilization\Model\flowprocessing $model
     */
    public function posInsert( $model ) {
        $result = (object) $this->setFlowStep($model);

        if(!$result->success) {
            throw new \PDOException($result->text);
        }
    }

    public function setFlowStep($model) {
        $id = $model->getId();
        $sterilizationtypeid = $model->getSterilizationtypeid();
        function nullIf ($value) {

            if(!isset($value)) {
                return 'null';
            }

            if (is_numeric($value)) {
            } else {
                $value = utf8_decode((strlen($value) == 0) ? 'null' : "'$value'");
            }

            return $value;
        }

        try {
            $pdo = $this->prepare("select dataflowstep from sterilizationtype where id = :sterilizationtypeid");
            $pdo->bindValue(":sterilizationtypeid", $sterilizationtypeid, \PDO::PARAM_INT);

            $pdo->execute();
            $rows = self::encodeUTF8($pdo->fetchAll());
            $flow = self::jsonToObject($rows[0]['dataflowstep']);

            $fields = [
                'flowprocessingid','steplevel','elementtype',
                'elementname','stepflaglist','stepsettings',
                'steppriority','source','target','areasid','equipmentid',
                'flowchoice', 'flowbreach', 'exceptionby','exceptiondo'
            ];

            foreach ($flow as $step) {
                $data = "insert into flowprocessingstep ("  . trim(implode(', ', $fields)) . ") values ( %d, %d, %s, %s, %s, %s, %s, %s, %s, %s, %s, %d, %d, %s, %s );";

                $list[] =   sprintf(
                    $data,
                    $id,
                    $step->steplevel,
                    nullIf(isset($step->elementtype) ? $step->elementtype : ''),
                    nullIf(isset($step->elementname) ? $step->elementname : ''),
                    nullIf(isset($step->stepflaglist) ? $step->stepflaglist : ''),
                    nullIf(isset($step->stepsettings) ? $step->stepsettings : ''),
                    nullIf(isset($step->steppriority) ? $step->steppriority : ''),
                    nullIf(isset($step->source) ? $step->source : null),
                    nullIf(isset($step->target) ? $step->target : null),
                    nullIf($step->areasid),
                    nullIf($step->equipmentid),
                    nullIf(isset($step->flowchoice) ? $step->flowchoice : 0),
                    nullIf(isset($step->flowbreach) ? $step->flowbreach : 0),
                    nullIf(isset($step->exceptionby) ? $step->exceptionby : ''),
                    nullIf(isset($step->exceptiondo) ? $step->exceptiondo : '')
                );
            }

            $insert = join ("\r\n", $list);

            $sql = "
                SET XACT_ABORT ON
                SET NOCOUNT ON
                SET ANSI_NULLS ON
                SET ANSI_WARNINGS ON

                declare
                    @error_code int = 0, 
                    @error_text nvarchar(200);

                BEGIN TRY

                    BEGIN TRAN setFlowStep;

                    {$insert}

                    COMMIT TRAN setFlowStep;

                    set @error_code = 0;
                    set @error_text = 'Atualizacoes realizadas com sucesso!';

                END TRY

                BEGIN CATCH
                    ROLLBACK TRAN setFlowStep;
                    set @error_code = error_number();
                    set @error_text = ' # ' +error_message() + ', ' + cast(error_line() as varchar);
                END CATCH

                select @error_code as error_code, @error_text as error_text;";

            $rows = $this->query($sql)->fetchAll();

            $sql = "
                update
                    flowprocessingstep
                    set
                        source = (
                            select top 1
                                a.id
                            from
                                flowprocessingstep a
                            where a.flowprocessingid = flowprocessingstep.flowprocessingid
                              and a.steplevel = flowprocessingstep.source
                        ),
                        target = (
                            select top 1
                                a.id
                            from
                                flowprocessingstep a
                            where a.flowprocessingid = flowprocessingstep.flowprocessingid
                              and a.steplevel = flowprocessingstep.target
                        )
                where flowprocessingid = {$id}";

            $this->exec($sql);

            $message = $rows[0]['error_text'];
            $success = intval($rows[0]['error_code']) == 0;

            self::_setRows($rows);
            self::_setText($message);
            self::_setSuccess($success);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResult();
    }

    public function newFlowView(array $data) {
        $query = self::jsonToObject($data['query']);

        try {

            //Gerando BarCode
            $dateof = date("Ym");
            $pdo = $this->prepare("select dbo.getLeftPad(6,'0',count(*)+1) as newcode  from flowprocessing where convert(varchar(6),dateof,112) = :dateof;");
            $pdo->bindValue(":dateof", $dateof, \PDO::PARAM_STR);
            $pdo->execute();
            $rows = $pdo->fetchAll();
            $barcode = $dateof . $rows[0]['newcode'];
            unset($pdo);
            unset($rows);

            $coach = new \iSterilization\Coach\flowprocessing();

            $coach->getStore()->getModel()->set('barcode',$barcode);
            $coach->getStore()->getModel()->set('version',$query->version);
            $coach->getStore()->getModel()->set('areasid',$query->areasid);
            $coach->getStore()->getModel()->set('clientid',$query->clientid);
            $coach->getStore()->getModel()->set('username',$query->username);
            $coach->getStore()->getModel()->set('materialid',$query->materialid);
            $coach->getStore()->getModel()->set('prioritylevel',$query->prioritylevel);
            $coach->getStore()->getModel()->set('sterilizationtypeid',$query->sterilizationtypeid);

            if(isset($query->materialboxid) && strlen($query->materialboxid) != 0) {
                $coach->getStore()->getModel()->set('materialboxid',$query->materialboxid);
            }

            if($query->clienttype == '004') {
                $coach->getStore()->getModel()->set('placeid',$query->placeid);
                $coach->getStore()->getModel()->set('flowingid',$query->flowingid);
                $coach->getStore()->getModel()->set('patientname',$query->patientname);
                $coach->getStore()->getModel()->set('healthinsurance',$query->healthinsurance);
                $coach->getStore()->getModel()->set('surgicalwarning',$query->surgicalwarning);
                $coach->getStore()->getModel()->set('instrumentatorid',$query->instrumentatorid);
            }

            $model = $coach->getStore()->getModel();
            $this->preInsert($model);

            $result = self::jsonToObject($coach->getStore()->insert());

            if($result->success) {
                $model = $coach->getStore()->getModel();
                $this->posInsert($model);
            }

            $step = array();

            $step['flowprocessingid'] = $result->rows->id;

            if($result->success) {
                $this->newFlowStep($step);
            }

            $result = self::objectToJson($result);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            $result = self::getResultToJson();
        }

        return $result;
    }

    public function newFlowStep(array $step) {
        $flowprocessingid = $step['flowprocessingid'];

        $sql = "
            -- Metodo Inicia Leitura
            select
                fps.id,  
                fps.steppriority, 
                fps.steplevel, 
                fps.elementtype, 
                fps.elementname, 
                fps.stepflaglist, 
                fps.stepsettings
            from
                flowprocessingstep fps
                inner join flowprocessing fp on ( fp.id = fps.flowprocessingid )
            where fp.flowstatus = 'R'
              and fps.flowstepstatus = '000'
              and fps.elementtype not in ('uml.StartState','uml.EndState')
              and fps.flowprocessingid = :flowprocessingid 
            order by fps.steplevel, fps.steppriority";

        try {
            $pdo = $this->prepare($sql);
            $pdo->bindValue(":flowprocessingid", $flowprocessingid, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            $flow = new \iSterilization\Coach\flowprocessing();
            $step = new \iSterilization\Coach\flowprocessingstep();
            $action = new \iSterilization\Coach\flowprocessingstepaction();

            while(list(, $item) = each($rows)) {
                extract($item);

                $pos = strpos($stepflaglist, '001');

                if ($pos !== false) {

                    // insert flowprocessingstepaction
                    $action->getStore()->getModel()->set('flowprocessingstepid',$id);
                    $action->getStore()->getModel()->set('flowstepaction','001');
                    $action->getStore()->getModel()->set('isactive',1);
                    $action->getStore()->insert();

                    // update flowprocessing
                    $flow->getStore()->getModel()->set('id',$flowprocessingid);
                    $flow->getStore()->getModel()->set('flowstatus','I');
                    $flow->getStore()->update();

                    // update flowprocessingstep
                    $date = date("Ymd H:i:s");
                    $step->getStore()->getModel()->set('id',$id);
                    $step->getStore()->getModel()->set('datestart',$date);
                    $step->getStore()->getModel()->set('flowstepstatus','001');
                    $step->getStore()->update();

                    $data = array();
                    $data['id'] = $id;
                    // insert flowprocessingstepmaterial
                    $this->newFlowItem($data);
                    break;
                }
            }
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function newFlowItem(array $data) {
        $id = $data['id'];

        $sql = "
            declare
                @materialid int,
                @materialboxid int,
                @flowprocessingstepid int = :id;
            
                select
                    @materialid = fp.materialid,
                    @materialboxid = fp.materialboxid
                from
                    flowprocessing fp
                    inner join flowprocessingstep fps on ( fps.flowprocessingid = fp.id )
                where fps.id = @flowprocessingstepid;
            
                set @materialid = coalesce(@materialid,0);
                set @materialboxid = coalesce(@materialboxid,0);
            
                if(@materialboxid != 0)
                begin
                    insert into
                        flowprocessingstepmaterial ( flowprocessingstepid, materialid, unconformities ) 
                    select
                        fps.id as flowprocessingstepid,
                        mbi.materialid,
                        '001' as unconformities
                    from
                        flowprocessing fp
                        inner join flowprocessingstep fps on ( fps.flowprocessingid = fp.id )
                        inner join materialboxitem mbi on ( mbi.materialboxid = fp.materialboxid and mbi.boxitemstatus = 'A' )
                    where fps.id = @flowprocessingstepid;
            
                    update
                        flowprocessingstepmaterial
                        set unconformities = '010',
                            dateto = getDate()
                    where materialid = @materialid
                      and flowprocessingstepid = @flowprocessingstepid;
                end
                else
                begin
                    insert into
                        flowprocessingstepmaterial ( flowprocessingstepid, materialid, unconformities, dateto ) 
                    values
                        ( @flowprocessingstepid, @materialid, '010', getDate() )
                end";

        try {
            $pdo = $this->prepare($sql);
            $pdo->bindValue(":id", $id, \PDO::PARAM_INT);

            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResult();
    }

    public function updateUserStep(array $data) {
        $username = $data['username'];
        $flowprocessingstepid = $data['flowprocessingstepid'];
        $step = new \iSterilization\Coach\flowprocessingstep();
        $message = new \iSterilization\Coach\flowprocessingstepmessage();

        $date = date("Ymd H:i:s");
        $step->getStore()->getModel()->set('id',$flowprocessingstepid);
        $step->getStore()->getModel()->set('username',$username);
        $step->getStore()->getModel()->set('datestart',$date);
        $result = $step->getStore()->update();

        $message->getStore()->getModel()->set('id','');
        $message->getStore()->getModel()->set('flowprocessingstepid',$flowprocessingstepid);
        $message->getStore()->getModel()->set('readercode','001');
        $message->getStore()->getModel()->set('readershow','info');
        $message->getStore()->getModel()->set('readertext','SATOR_INICIAR_LEITURA');
        $message->getStore()->insert();

        return $result;
    }

    public function updatetUnconformities(array $data) {
        $flowprocessingstepid = $data['flowprocessingstepid'];

        try {
            $pdo = $this->prepare("update flowprocessingstepmaterial set unconformities = '001' where flowprocessingstepid = :id");
            $pdo->bindValue(":id", $flowprocessingstepid, \PDO::PARAM_INT);

            $pdo->execute();

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function getExceptionDo(array $data) {
        $typeid = self::jsonToArray($data['typeid']);
        $flowprocessingid = $data['flowprocessingid'];
        $steplevel = self::jsonToArray($data['steplevel']);

        $typeid = implode(",", $typeid);
        $steplevel = implode(",", $steplevel);

        $sql = "
            select
                a.id,
                a.name,
                fps.id as stepsource,
                fps.typechoice,
                fps.stepchoice,
                fps.flowbreach,
                fps.flowchoice,
                fps.exceptiondo
            from
                flowprocessingstep fps
                inner join areas a on ( a.id = fps.areasid )
            where fps.flowprocessingid = :flowprocessingid
              and fps.steplevel in ({$steplevel})
              and fps.areasid in ({$typeid})";

        try {
            $pdo = $this->prepare($sql);
            $pdo->bindValue(":flowprocessingid", $flowprocessingid, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);
            self::_setSuccess(count($rows) != 0);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function setExceptionDo(array $data) {
        $flowprocessingid = $data['flowprocessingid'];
        $flowprocessingstepid = $data['flowprocessingstepid'];
        $flowprocessingstepactionid = $data['flowprocessingstepactionid'];

        $params = self::jsonToArray($data['params']);

        $data['params'] = $params;

        try {

            while (list(, $item) = each($params)) {
                extract($item);

                $filtercode = ($elementtype == 'basic.Equipment') ? "and fps.equipmentid = $elementcode" : "and fps.areasid = $elementcode";

                $sql = "
                    declare
                        @id int,
                        @source int,
                        @target int,
                        @steplevel int = :steplevel,
                        @stepchoice int = :stepchoice,
                        @levelsource int = :levelsource,
                        @flowprocessingid int = :flowprocessingid;

                    select
                        @id = fps.id,
                        @source = fps.source,
                        @target = fps.target
                    from
                        flowprocessingstep fps
                    where fps.flowprocessingid = @flowprocessingid
                      and fps.steplevel = @steplevel
                      {$filtercode};

                    update flowprocessingstep set target = @id where id = @source;
                    update flowprocessingstep set source = @source where id = @id;
                    update flowprocessingstep set source = @id where id = @target;
                    update flowprocessingstep set stepchoice = @stepchoice where id = @id;
                    
                    if (@stepchoice = 2)
                    begin
                        insert into 
                            flowprocessingstepaction ( flowprocessingstepid, flowstepaction, isactive )
                        values
                            (@source,'002',1);
                    end";

                $pdo = $this->prepare($sql);
                $pdo->bindValue(":steplevel", $steplevel, \PDO::PARAM_INT);
                $pdo->bindValue(":stepchoice", $stepchoice, \PDO::PARAM_INT);
                $pdo->bindValue(":levelsource", $levelsource, \PDO::PARAM_INT);
                $pdo->bindValue(":flowprocessingid", $flowprocessingid, \PDO::PARAM_INT);
                $pdo->execute();
            }

            $item = [];

            $item['flowprocessingid'] = $flowprocessingid;
            $item['flowprocessingstepid'] = $flowprocessingstepid;
            $item['flowprocessingstepactionid'] = $flowprocessingstepactionid;

            $this->setEncerrarLeitura($item);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function setEncerrarLeitura (array $data) {
        $flowprocessingid = $data['flowprocessingid'];
        $flowprocessingstepid = $data['flowprocessingstepid'];
        $flowprocessingstepactionid = $data['flowprocessingstepactionid'];

        $result = null;

        try {

            $step = new \iSterilization\Coach\flowprocessingstep();
            $action = new \iSterilization\Coach\flowprocessingstepaction();

            // update flowprocessingstepaction
            $action->getStore()->getModel()->set('id', $flowprocessingstepactionid);
            $action->getStore()->getModel()->set('isactive', 0);
            $action->getStore()->update();

            $sql = "
                declare
                    @newid int,
                    @flowprocessingid int = :flowprocessingid,
                    @flowprocessingstepid int = :flowprocessingstepid;
                                    
                select top 1
                    @newid = fps.id
                from
                    flowprocessingstep fps
                where fps.flowprocessingid = @flowprocessingid
                    and fps.id > @flowprocessingstepid
                    and ( fps.stepflaglist like '%001%' or fps.stepflaglist like '%019%' )                
                
                select @newid as newid;";

            $pdo = $this->prepare($sql);
            $pdo->bindValue(":flowprocessingid", $flowprocessingid, \PDO::PARAM_INT);
            $pdo->bindValue(":flowprocessingstepid", $flowprocessingstepid, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();
            $newid = $rows[0]['newid'];
            unset($pdo);

            if(count($rows) != 0) {
                // insert flowprocessingstepaction
                $action->getStore()->getModel()->set('flowprocessingstepid',$newid);
                $action->getStore()->getModel()->set('flowstepaction','001');
                $action->getStore()->getModel()->set('isactive',1);
                $result = $action->getStore()->insert();

                // update flowprocessingstep
                $date = date("Ymd H:i:s");
                $step->getStore()->getModel()->set('id',$newid);
                $step->getStore()->getModel()->set('datestart',$date);
                $step->getStore()->getModel()->set('flowstepstatus','001');
                $step->getStore()->update();

                $sql = "
                    declare
                        @flowprocessingstepid int = :flowprocessingstepid;
                        
                    insert into
                          flowprocessingstepmaterial
                          ( flowprocessingstepid, materialid, unconformities, dateof )  
                    select
                          {$newid} as flowprocessingstepid,
                          materialid,
                          '001' as unconformities,
                          getdate() dateof
                    from
                        flowprocessingstepmaterial
                    where flowprocessingstepid = @flowprocessingstepid;";

                $pdo = $this->prepare($sql);
                $pdo->bindValue(":flowprocessingstepid", $flowprocessingstepid, \PDO::PARAM_INT);
                $pdo->execute();
            }

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return $result || self::getResultToJson();
    }

    public function setRemoveCargaLista(array $data) {
        $id = $data['id'];

        $charge = new \iSterilization\Coach\flowprocessingcharge();

        $charge->getStore()->getModel()->set('id',$id);
        $charge->getStore()->getModel()->set('chargeflag','004');
        $result = $charge->getStore()->update();

        try {

            return $result;

        } catch ( \PDOException $e ) {

            self::_setSuccess(false);
            self::_setText($e->getMessage());
            return self::getResultToJson();

        }
    }

    public function setValidaCargaLista(array $data) {
        $username = $data['username'];
        $duration = $data['duration'];
        $timetoopen = $data['timetoopen'];
        $temperature = $data['temperature'];
        $equipmentcycleid = $data['equipmentcycleid'];

        $utimestamp = microtime(true);
        $timestamp = floor($utimestamp);
        $milliseconds = round(($utimestamp - $timestamp) * 1000000);

        $barcode = substr("L" . date("YmdHis") . $milliseconds,0,20);

        $list = self::jsonToArray($data['list']);

        $charge = new \iSterilization\Coach\flowprocessingcharge();
        $chargeitem = new \iSterilization\Coach\flowprocessingchargeitem();

        try {
            $charge->getStore()->getModel()->set('chargeflag','001');
            $charge->getStore()->getModel()->set('barcode',$barcode);
            $charge->getStore()->getModel()->set('duration',$duration);
            $charge->getStore()->getModel()->set('chargeuser',$username);
            $charge->getStore()->getModel()->set('timetoopen',$timetoopen);
            $charge->getStore()->getModel()->set('temperature',$temperature);
            $charge->getStore()->getModel()->set('equipmentcycleid',$equipmentcycleid);
            $result = self::jsonToObject($charge->getStore()->insert());

            while (list(, $item) = each($list)) {
                extract($item);

                $chargeitem->getStore()->getModel()->set('chargestatus','001');
                $chargeitem->getStore()->getModel()->set('flowprocessingchargeid',$result->rows->id);
                $chargeitem->getStore()->getModel()->set('flowprocessingstepid',$flowprocessingstepid);
                $chargeitem->getStore()->insert();
            }

            unset($charge);
            unset($chargeitem);

            self::_setSuccess(true);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function setStatusCiclo(array $data) {
        $id = $data['id'];
        $username = $data['username'];
        $cyclestatus = $data['cyclestatus'];

        try {

            $sql = "
                declare
                    @id int = :id,
                    @username varchar(80) = :username,
                    @cyclestatus varchar(5) = :cyclestatus;
             
                if(@cyclestatus = 'START')
                begin
                    update 
                        flowprocessingcharge
                    set
                        chargeflag = '002',
                        cyclestart = getdate(),
                        cyclestartuser = @username
                    where id = @id;
                end
                
                if(@cyclestatus = 'FINAL')
                begin               
                    update 
                        flowprocessingcharge
                    set
                        chargeflag = '003',
                        cyclefinal = getdate(),
                        cyclefinaluser = @username
                    where id = @id;
                    
                    update 
                        flowprocessingstepmaterial
                    set
                        dateto = getdate(),
                        unconformities = '010'
                    where flowprocessingstepid in ( select flowprocessingstepid from flowprocessingchargeitem where flowprocessingchargeid = @id );
                    
                    update
                        flowprocessingstepaction
                    set
                        dateto = getdate(),
                        isactive = 0
                    where flowstepaction = '001' 
                      and flowprocessingstepid in ( select flowprocessingstepid from flowprocessingchargeitem where flowprocessingchargeid = @id );
                end;";

            $pdo = $this->prepare($sql);
            $pdo->bindValue(":id", $id, \PDO::PARAM_INT);
            $pdo->bindValue(":username", $username, \PDO::PARAM_STR);
            $pdo->bindValue(":cyclestatus", $cyclestatus, \PDO::PARAM_STR);
            $pdo->execute();

            if($cyclestatus == 'FINAL') {

                $sql = "
                    declare
                        @id int = :id;
                 
                    select
                        fps.flowprocessingid,
                        fpci.flowprocessingstepid,
                        fpsa.id as flowprocessingstepactionid
                    from
                        flowprocessingchargeitem fpci
                        inner join flowprocessingstep fps on ( fps.id = fpci.flowprocessingstepid )
                        inner join flowprocessingstepaction fpsa on ( fpsa.flowprocessingstepid = fps.id )
                    where fpci.flowprocessingchargeid = @id
                      and fpsa.flowstepaction = '001'";

                $pdo = $this->prepare($sql);
                $pdo->bindValue(":id", $id, \PDO::PARAM_INT);
                $pdo->execute();
                $rows = $pdo->fetchAll();

                foreach ($rows as $item) {
                    self::jsonToObject($this->setEncerrarLeitura($item));
                }

                self::_setRows($rows);
            }

            self::_setSuccess(true);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    /**
     *  Cadastros
     *     Material
     *          - Bloqueado     - Inviabiliza Leituras
     *     Kit
     *          - Bloqueado     - Inviabiliza Leituras
     *
     *     Fluxo Atual
     *          - Fecha e não pode avançar para próxima Área
     */
    public function setUnconformities(array $data) {

        $update = self::jsonToArray($data['update']);
        $params = self::jsonToArray($data['params']);

        $materiallist = implode(',',$update);
        $flowprocessingstepid = $params['id'];
        $flowprocessingid = $params['flowprocessingid'];
        $flowprocessingstepactionid = $params['flowprocessingstepactionid'];

        $sql = "
            declare
                @flowprocessingid int = :flowprocessingid, 
                @flowprocessingstepid int = :flowprocessingstepid,
                @flowprocessingstepactionid int = :flowprocessingstepactionid;
    
            update flowprocessing
                set
                    dateto = getdate(),
                    flowstatus = 'A'
            where id = @flowprocessingid;
            
            update flowprocessingstep
                set 
                    datefinal = getdate(),
                    flowstepstatus = '003'
            where id = @flowprocessingstepid;
    
            update flowprocessingstepaction
                set 
                    dateto = getdate(),
                    isactive = 0
            where id = @flowprocessingstepactionid;
                
            update material
                set
                    materialstatus = '005'
            where id in ($materiallist);";

        try {
            $pdo = $this->prepare($sql);
            $pdo->bindValue(":flowprocessingid", $flowprocessingid, \PDO::PARAM_INT);
            $pdo->bindValue(":flowprocessingstepid", $flowprocessingstepid, \PDO::PARAM_INT);
            $pdo->bindValue(":flowprocessingstepactionid", $flowprocessingstepactionid, \PDO::PARAM_INT);
            $pdo->execute();
            self::_setSuccess(true);
        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    /**
     * Select
     */

    public function selectAreaStep(array $data) {
        $query = $data['query'];

        return self::getResultToJson();
    }

    public function selectTaskName(array $data) {
        $query = $data['query'];

        $sql = "
            select
                u.id,
                u.username,
                u.fullname,
                u.isactive
            from
                users u
            where u.username = :usercode";

        try {
            $pdo = $this->prepare($sql);
            $pdo->bindValue(":usercode", $query, \PDO::PARAM_STR);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);
            self::_setSuccess(count($rows) != 0);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectUserCode(array $data) {
        $query = $data['query'];

        $sql = "
            select
                u.id,
                u.username,
                u.fullname,
                u.isactive
            from
                users u
            where u.username = :usercode";

        try {
            $pdo = $this->prepare($sql);
            $pdo->bindValue(":usercode", $query, \PDO::PARAM_STR);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);
            self::_setSuccess(count($rows) != 0);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectUserFlow(array $data) {
//        $id = $data['id'];
//        $username = $data['username'];
//        $password = $data['password'];
        $usercode = str_replace('HAM-','',$data['usercode']);
        $userfail = "Sua tentativa fracassou, o usuário NÂO foi Autenticado!";

//        $sql = "select username, password from users where id = :id and username = :username";

        $sql = "
            select
                u.username,
                u.password
            from
                collaborator c
                inner join users u on ( u.id = c.usersid )
            where c.registration = :usercode";


        self::_setSuccess(false);

        if(!is_numeric($usercode)) {
            self::_setText($userfail);
            return self::getResultToJson();
        }

        try {
            $pdo = $this->prepare($sql);
//            $pdo->bindValue(":id", $id, \PDO::PARAM_INT);
//            $pdo->bindValue(":username", $username, \PDO::PARAM_STR);
            $pdo->bindValue(":usercode", $usercode, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();

//            $passwordUser = (count($rows) != 0) ? $rows[0]['password'] : '';
//            $success = self::tryHash($password,$passwordUser);
            $success = (count($rows) != 0);

//            $rows[0]['password'] = '';

            self::_setRows($rows);
            self::_setSuccess($success);
            self::_setText($success ? 'Autenticado com sucesso!' : $userfail);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectFlowDash(array $data) {
        $query = $data['query'];

        $sql = "
            select
                fps.id,
                fps.username,
                fps.datestart,
                fps.elementname,
                fps.elementtype,
                fps.stepflaglist,
                fps.stepsettings,
                fps.steppriority,
                a.name as areasname,
                ib.name as equipmentname,
                st.name as sterilizationtypename,
                c.name as clientname,
                fp.materialboxid,
                mb.name as materialboxname,
                dbo.getEnum('prioritylevel',fp.prioritylevel) as priorityleveldescription,
                fps.flowstepstatus,
                colorschema = (
                    select stuff
                        (
                            (
                                select
                                    ',#' + tc.colorschema
                                from
                                    materialboxtarge mbt
                                    inner join targecolor tc on ( tc.id = mbt.targecolorid )
                                where mbt.materialboxid = fp.materialboxid
                                order by mbt.targeorderby desc
                                for xml path ('')
                            ) ,1,1,''
                        )                
                )
            from
                flowprocessingstepaction fpsa
                inner join flowprocessingstep fps on ( fps.id = fpsa.flowprocessingstepid )
                inner join flowprocessing fp on ( fp.id = fps.flowprocessingid )
                left join areas a on ( a.id = fps.areasid )
                left join itembase ib on ( ib.id = fps.equipmentid )
                left join materialbox mb on ( mb.id = fp.materialboxid )
                inner join sterilizationtype st on ( st.id = fp.sterilizationtypeid )
                inner join client c on ( c.id = fp.clientid )
            where fpsa.id = :id";

        try {
            $pdo = $this->prepare($sql);
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

    public function selectFlowItem(array $data) {
        $query = $data['query'];

        $sql = "
            select
                ib.id,
                ib.name as materialname,
                ib.barcode,
                ib.description,
                b.materialboxid,
                dbo.binary2base64(ib.filedata) as filedata,
                ib.fileinfo,
                mf.name as manufacturername,
                -- tipo de fluxo e prioridade
                mtf.sterilizationtypeid,
                st.name as sterilizationtypename,
                mtf.prioritylevel,
                dbo.getEnum('prioritylevel',mtf.prioritylevel) as priorityleveldescription,
                st.name +' ('+ dbo.getEnum('prioritylevel',mtf.prioritylevel) +')' as sterilizationpriority
            from
                itembase ib
                inner join manufacturer mf on ( mf.id = ib.manufacturerid )
                inner join material m on ( m.id = ib.id )
                inner join materialtypeflow mtf on ( mtf.materialid = m.id and mtf.prioritylevel = 'N' )
                inner join sterilizationtype st on ( st.id = mtf.sterilizationtypeid )
                outer apply (
					select top 1
						mbi.materialboxid
					from
						materialboxitem mbi
					where mbi.materialid = ib.id
				) b
            where ib.isactive = 1
              and (
                    ib.barcode = :barcode OR
                    ib.name COLLATE Latin1_General_CI_AI LIKE :name
              )";

        try {
            $pdo = $this->prepare($sql);
            $pdo->bindValue(":barcode", $query, \PDO::PARAM_INT);
            $pdo->bindValue(":name", "{$query}%", \PDO::PARAM_STR);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function imprimeEtiqueta(array $data) {
        $stepsettings = isset($data['stepsettings']) ? $data['stepsettings'] : null;

        $stepsettings = self::jsonToObject($stepsettings);

        $return = ($stepsettings->tagprinter == '001') ? $this->imprimeEtiqueta001($data) : $this->imprimeEtiqueta002($data);

        return $return;
    }

    public function imprimeEtiqueta001(array $data) {
        $id = $data['id'];
        $printlocate = isset($data['printlocate']) ? $data['printlocate'] : null;

        $ph = $printlocate ? printer_open($printlocate) : null;

        $sql = "
            declare
                @id int = :id;
                 
            select
                fp.barcode,
                t.proprietaryname,
                st.name as sterilizationtypename,
                fps.username,
                fp.dateof,
                st.validity as days,
                dateadd(day,st.validity,fp.dateof) as validity,
                coalesce(mb.name,t.materialname) as materialboxname,
                entityname = ( select top 1 name from entity ),
                quantity = ( select count(*) from flowprocessingstepmaterial where flowprocessingstepid = fps.id )
            from
                flowprocessingstep fps
                inner join flowprocessing fp on ( fp.id = fps.flowprocessingid )
                inner join sterilizationtype st on ( st.id = fp.sterilizationtypeid )
                left join materialbox mb on ( mb.id = fp.materialboxid )
                cross apply (
                    select top 1
                        ib.name as materialname,
                        p.name as proprietaryname
                    from
                        flowprocessingstepmaterial fpsm
                        inner join itembase ib on ( ib.id = fpsm.materialid )
                        inner join proprietary p on ( p.id = ib.proprietaryid )
                    where fpsm.flowprocessingstepid = fps.id
                ) t
            where fps.id = :id";

        try {
            $pdo = $this->prepare($sql);
            $pdo->bindValue(":id", $id, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            $entityname = $rows[0]['entityname'];
            $proprietaryname = $rows[0]['proprietaryname'];
            $dateof = $rows[0]['dateof'];
            $username = $rows[0]['username'];
            $sterilizationtypename = $rows[0]['sterilizationtypename'];
            $validity = $rows[0]['validity'];
            $days = $rows[0]['days'];
            $materialboxname = $rows[0]['materialboxname'];
            $quantity = $rows[0]['quantity'];
            $barcode = $rows[0]['barcode'];

            if($ph) {
                $tpl = "
                    ^XA
                    ^CF0,20
                    ^FO70,050^FD$entityname^FS
                    ^FO420,050^FD$proprietaryname^FS
                    ^FO70,080^FDPREPARADO EM: $dateof^FS
                    ^FO70,110^FDOP: $username^FS
                    ^FO70,140^FDPROCESSO: $sterilizationtypename^FS
                    ^FO70,170^FDVALIDADE: $validity ($days)^FS
                    ^FO130,200^FDVIDE ETIQUETA DE LOTE^FS
                    ^FO70,230^FDMATERIAL: $materialboxname ($quantity Itens)^FS
                    ^FO260,260^BXN,3,200^FD$barcode^FS^
                    ^FO70,275^FD$barcode^FS^
                    ^XZ";

                printer_set_option($ph, PRINTER_MODE, "RAW");
                printer_write($ph, $tpl);
                printer_close($ph);
            }  else {
                throw new \PDOException('A impressora não pode ser selecionada corretamente!');
            }

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function imprimeEtiqueta002(array $data) {
        $id = $data['id'];
        $printlocate = isset($data['printlocate']) ? $data['printlocate'] : null;

        $ph = $printlocate ? printer_open($printlocate) : null;

        $sql = "
            declare
                @id int = :id;
                 
            select
                fp.barcode,
                t.proprietaryname,
                st.name as sterilizationtypename,
                fps.username,
                fp.dateof,
                st.validity as days,
                dateadd(day,st.validity,fp.dateof) as validity,
                coalesce(mb.name,t.materialname) as materialboxname,
                entityname = ( select top 1 name from entity ),
                quantity = ( select count(*) from flowprocessingstepmaterial where flowprocessingstepid = fps.id )
            from
                flowprocessingstep fps
                inner join flowprocessing fp on ( fp.id = fps.flowprocessingid )
                inner join sterilizationtype st on ( st.id = fp.sterilizationtypeid )
                left join materialbox mb on ( mb.id = fp.materialboxid )
                cross apply (
                    select top 1
                        ib.name as materialname,
                        p.name as proprietaryname
                    from
                        flowprocessingstepmaterial fpsm
                        inner join itembase ib on ( ib.id = fpsm.materialid )
                        inner join proprietary p on ( p.id = ib.proprietaryid )
                    where fpsm.flowprocessingstepid = fps.id
                ) t
            where fps.id = :id";

        try {
            $pdo = $this->prepare($sql);
            $pdo->bindValue(":id", $id, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            $entityname = $rows[0]['entityname'];
            $proprietaryname = $rows[0]['proprietaryname'];
            $dateof = $rows[0]['dateof'];
            $username = $rows[0]['username'];
            $sterilizationtypename = $rows[0]['sterilizationtypename'];
            $validity = $rows[0]['validity'];
            $days = $rows[0]['days'];
            $materialboxname = $rows[0]['materialboxname'];
            $quantity = $rows[0]['quantity'];
            $barcode = $rows[0]['barcode'];

            if($ph) {
                $tpl = "
                    ^XA
                    ^CF0,20
                    ^FO70,050^FD$entityname^FS
                    ^FO420,050^FD$proprietaryname^FS
                    ^FO70,080^FDPREPARADO EM: $dateof^FS
                    ^FO70,110^FDOP: $username^FS
                    ^FO70,140^FDPROCESSO: $sterilizationtypename^FS
                    ^FO70,170^FDVALIDADE: $validity ($days)^FS
                    ^FO130,200^FDVIDE ETIQUETA DE LOTE^FS
                    ^FO70,230^FDMATERIAL: $materialboxname ($quantity Itens)^FS
                    ^FO260,260^BXN,3,200^FD$barcode^FS^
                    ^FO70,275^FD$barcode^FS^
                    ^XZ";

                printer_set_option($ph, PRINTER_MODE, "RAW");
                printer_write($ph, $tpl);
                printer_close($ph);
            }  else {
                throw new \PDOException('A impressora não pode ser selecionada corretamente!');
            }

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();

    }

}