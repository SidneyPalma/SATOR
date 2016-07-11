<?php

namespace Smart\Data;

use Smart\Utils\Submit;

/**
 * Um Model para a representação da tabela no Banco
 *
 * Class Model
 * @package Smart\Data
 */
class Model {

    /**
     * Requisição feita pelo cliente
     *
     * @var null|Submit
     */
    private $_submit = null;

    /**
     * Notações da classe Model
     *
     * @var null|stdClass
     */
    private $_notate = null;

    public function set ($field,$value) {
		$method = "set" . strtoupper($field[0]) . substr($field, 1);
	
		$this->$method($value);
        $this->_submit->setRowValue($field,$value);
		$this->_submit->setRawValue($field,$value);
		
        return $this;
    }

    public function get ($field) {
		$result = "Método inexistente na Classe!";
		$method = "get" . strtoupper($field[0]) . substr($field, 1);
	
		if(method_exists($this, $method)) {
			$result = $this->$method();
		}		
		
        return $result;
    }
	
    public function getSubmit() {
        return $this->_submit;
    }

    public function getNotate() {
        return $this->_notate;
    }

    public function setSubmit( Submit $submit ) {
        $this->_submit = $submit;
		return $this;
    }

    public function setNotate( \stdClass $notate ) {
        $this->_notate = $notate;
		return $this;
    }

    public function getRecord() {
        $record = array();
        $fields = $this->getNotate()->property;

        foreach ($fields as $field => $value) {
            $method = "get" . strtoupper($field[0]) . substr($field, 1);
            $record[$field] = $this->$method();
        }

        return $record;
    }

    public function setRecord() {
        $fields = $this->_notate->property;

        foreach ($this->_submit["rows"] as $field => $value) {
            if(isset($fields[$field]) && strlen($value) !== 0 ) {
                $method = "set" . strtoupper($field[0]) . substr($field, 1);
                if(method_exists($this, $method)) {
                    $this->$method($value);
                }
            }
        }

        return $this;
    }

}