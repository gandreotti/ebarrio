<?php
if(!defined('BASEPATH')) exit('No direct script access allowed');
//require(APPPATH'.libraries/REST_Controller.php');

class CargoTrabajador extends CI_Controller {

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
		$this->load->model('cargotrabajador_model');
		$this->output->enable_profiler(FALSE);
	}

	public function verCargoDeTrabajadores()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		if($method == "OPTIONS")
        {
            die();
        }
		if($method != 'POST'){
			json_output(400,array('status' => 400,'message' => 'Solicitud incorrecta.'));
		} else {
			$cargoTrabajadores = $this->cargotrabajador_model->verCargoDeTrabajadores();
			json_output(200,$cargoTrabajadores);
		}
	}

	public function crearCargoDeTrabajador()
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
			$cargoTrabajador = $this->cargotrabajador_model->crearCargoDeTrabajador($params);
			json_output(200,$cargoTrabajador);
		}
	}

	public function editarCargoDeTrabajador()
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
			$cargoTrabajador = $this->cargotrabajador_model->editarCargoDeTrabajador($params);
			json_output(200,$cargoTrabajador);
		}
	}


	public function eliminarCargoDeTrabajador()
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
			$cargoTrabajador = $this->cargotrabajador_model->eliminarCargoDeTrabajador($params['id_cargo_trabajador']);
			json_output($cargoTrabajador['status'],$cargoTrabajador);
		}
	}

}