<?php
if(!defined('BASEPATH')) exit('No direct script access allowed');
//require(APPPATH'.libraries/REST_Controller.php');

class Consumos extends CI_Controller {

	public function __construct()
	{
	    $method = $_SERVER['REQUEST_METHOD'];
	    if($method == "OPTIONS") {
	        die();
	    }

		parent::__construct();
		$this->load->model('consumos_model');
		$this->output->enable_profiler(FALSE);
	}

	public function verConsumo()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		if($method == "OPTIONS")
        {
            die();
        }
		if($method == 'GET'){
			$ventas = $this->consumos_model->verConsumo();
			json_output(200,$ventas);
		}
		 else {
			json_output(400,array('Error' => 'Solicitud incorrecta.'));
		}
	}

	public function verPromedios()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		if($method == "OPTIONS")
        {
            die();
        }
		if($method == 'GET'){
			$ventas = $this->consumos_model->verPromedios();
			json_output(200,$ventas);
		}
		 else {
			json_output(400,array('Error' => 'Solicitud incorrecta.'));
		}
	}

	public function verConsumoId()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		if($method == "OPTIONS")
        {
            die();
        }
		if($method != 'GET'){
			json_output(400,array('status' => 400,'message' => 'Solicitud incorrecta.'));
		} else {
			$params = $this->input->get();
			$consumo = $this->consumos_model->verConsumoId($params);
			json_output(200,$consumo['consumos'][0]);
		}
	}

	public function guardarMetas()
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
			$meta = $this->consumos_model->crearVenta($params);
			json_output(200,$meta);
		}
	}
	public function guardarConsumo()
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
			$consumo = $this->consumos_model->guardarConsumo($params);
			json_output(200,$consumo);
		}
	}


	public function eliminarVenta()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		if($method == "OPTIONS")
        {
            die();
        }
		if($method != 'DELETE'){
			json_output(400,array('status' => 400,'message' => 'Solicitud incorrecta.'));
		} else {
			$params = json_decode(file_get_contents('php://input'), TRUE);
			$venta = $this->venta_model->eliminarVenta($params['id_venta']);
			json_output(200,$venta);
		}
	}

}