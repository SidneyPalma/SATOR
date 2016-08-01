<?php

namespace iSterilization\Event;

use Smart\Utils\Session;

class flowprocessing extends \Smart\Data\Event {

    /**
     * @param \iSterilization\Model\flowprocessing $model
     */
    public function preInsert( \iSterilization\Model\flowprocessing &$model ) {
        Session::hasProfile('','');
        $sterilizationtypeid = $model->getSterilizationtypeid();

        $pdo = $this->getProxy()->prepare("select authenticate from sterilizationtype where id = :sterilizationtypeid");
        $pdo->bindValue(":sterilizationtypeid", $sterilizationtypeid, \PDO::PARAM_INT);

        $pdo->execute();
        $rows = $pdo->fetchAll();
        $authenticate = $rows[0]['authenticate'];

        if(intval($authenticate) == 0) {
            throw new \PDOException('O Fluxo Selecionado para esta Leitura Não Está Autenticado!');
        }
    }

    /**
     * @param \iSterilization\Model\flowprocessing $model
     */
    public function posInsert( \iSterilization\Model\flowprocessing &$model ) {
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
            $pdo = $this->getProxy()->prepare("select dataflowstep from sterilizationtype where id = :sterilizationtypeid");
            $pdo->bindValue(":sterilizationtypeid", $sterilizationtypeid, \PDO::PARAM_INT);

            $pdo->execute();
            $rows = self::encodeUTF8($pdo->fetchAll());
            $flow = self::jsonToObject($rows[0]['dataflowstep']);

            $fields = [
                'flowprocessingid','steplevel','elementtype',
                'elementname','stepflaglist','stepsettings',
                'steppriority','source','target',
                'areasid','equipmentid'
            ];

            foreach ($flow as $step) {
                $data = "insert into flowprocessingstep ("  . trim(implode(', ', $fields)) . ") values ( %d, %d, %s, %s, %s, %s, %s, %s, %s, %s, %s );";

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
                                    nullIf($step->equipmentid)
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

                        --RAISERROR ('Error raised in TRY block.', -- Message text.
                        --           16, -- Severity.
                        --           1 -- State.
                        --           );

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

            $rows = $this->getProxy()->query($sql)->fetchAll();

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

    /**
     * @param \iSterilization\Model\flowprocessing $model
     */
    public function preUpdate( \iSterilization\Model\flowprocessing &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessing $model
     */
    public function posUpdate( \iSterilization\Model\flowprocessing &$model ) {
    }

    /**
     * @param \iSterilization\Model\flowprocessing $model
     */
    public function preDelete( \iSterilization\Model\flowprocessing &$model ) {
        Session::hasProfile('','');
    }

    /**
     * @param \iSterilization\Model\flowprocessing $model
     */
    public function posDelete( \iSterilization\Model\flowprocessing &$model ) {

    }

}