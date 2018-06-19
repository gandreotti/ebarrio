<?php
if(!defined('BASEPATH')) exit('No direct script access allowed');
//require(APPPATH'.libraries/REST_Controller.php');

class CargaHoras extends CI_Controller {

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
		$this->load->model('cargahoras_model');
		$this->output->enable_profiler(FALSE);
	}

	public function crearCargaHoras()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		if($method != 'POST'){
			json_output(400,array('status' => 400,'message' => 'Solicitud incorrecta.'));
		} else {
			$params = json_decode(file_get_contents('php://input'), TRUE);
			$cargaHoras = $this->cargahoras_model->crearCargaHoras($params);
			json_output(200,$cargaHoras);
		}
	}

	public function verCargasDeTrabajador()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		if($method != 'POST'){
			json_output(400,array('status' => 400,'message' => 'Solicitud incorrecta.'));
		} else {
			$params = json_decode(file_get_contents('php://input'), TRUE);
			$cargasDeTrabajador = $this->cargahoras_model->verCargasDeTrabajador($params);
			json_output(200,$cargasDeTrabajador);
		}
	}

	public function editarCargaDeTrabajador()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		if($method != 'POST'){
			json_output(400,array('status' => 400,'message' => 'Solicitud incorrecta.'));
		} else {
			$params = json_decode(file_get_contents('php://input'), TRUE);
			$cargaDeTrabajador = $this->cargahoras_model->editarCargaDeTrabajador($params);
			json_output(200,$cargaDeTrabajador);
		}
	}


	public function eliminarCargaDeTrabajador()
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
			$cargaDeTrabajador = $this->cargahoras_model->eliminarCargaDeTrabajador($params['id_carga_horas']);
			json_output($cargaDeTrabajador['status'], array('id_carga_horas' => $params['id_carga_horas']));
		}
	}

}
