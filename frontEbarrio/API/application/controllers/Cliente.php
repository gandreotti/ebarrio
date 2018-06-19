<?php
if(!defined('BASEPATH')) exit('No direct script access allowed');
//require(APPPATH'.libraries/REST_Controller.php');

class Cliente extends CI_Controller {

	public function __construct()
	{
		header('Access-Control-Allow-Origin: *');
	    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
	    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	    $method = $_SERVER['REQUEST_METHOD'];
	    if($method == "OPTIONS") {
	        die();
	    }

		parent::__construct();
		$this->load->model('cliente_model');
		$this->output->enable_profiler(FALSE);
	}

	public function verClientes()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		if($method == "OPTIONS")
        {
            die();
        }
		if($method != 'POST'){
			json_output(400,array('status' => 400,'message' => 'Solicitud incorrecta.'));
		} else {
			$clientes = $this->cliente_model->verClientes();
			json_output(200,$clientes);
		}
	}

	public function crearCliente()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		if($method == "OPTIONS")
        {
            die();
        }
		if($method != 'POST'){
			json_output(400,array('status' => 400,'message' => 'Solicitud incorrecta.'));
		} else {
			$params = json_decode(file_get_contents('php://input'), TRUE);
			$cliente = $this->cliente_model->crearCliente($params);
			json_output(200,$cliente);
		}
	}

	public function editarCliente()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		if($method == "OPTIONS")
        {
            die();
        }
		if($method != 'POST'){
			json_output(400,array('status' => 400,'message' => 'Solicitud incorrecta.'));
		} else {
			$params = json_decode(file_get_contents('php://input'), TRUE);
			$cliente = $this->cliente_model->editarCliente($params);
			json_output(200,$cliente);
		}
	}


	public function eliminarCliente()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		if($method == "OPTIONS")
        {
            die();
        }
		if($method != 'POST'){
			json_output(400,array('status' => 400,'message' => 'Solicitud incorrecta.'));
		} else {
			$params = json_decode(file_get_contents('php://input'), TRUE);
			$cliente = $this->cliente_model->eliminarCliente($params['id_cliente']);
			json_output($cliente['status'],$cliente);
		}
	}

}