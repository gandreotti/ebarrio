<?php
if(!defined('BASEPATH')) exit('No direct script access allowed');
//require(APPPATH'.libraries/REST_Controller.php');

class Venta extends CI_Controller {

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
		$this->load->model('venta_model');
		$this->output->enable_profiler(FALSE);
	}

	public function verVentas()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		if($method == "OPTIONS")
        {
            die();
        }
		if($method == 'GET'){
			$ventas = $this->venta_model->verVentas();
			json_output(200,$ventas);
		}
		elseif($method == 'POST'){
			$params = json_decode(file_get_contents('php://input'), TRUE);
			print_r($params);
			$venta = $this->venta_model->crearVenta($params);
			json_output(200,$venta);
		}
		elseif($method == 'PUT'){
			$params = json_decode(file_get_contents('php://input'), TRUE);
			$venta = $this->venta_model->editarVenta($params);
			json_output(200,$venta);
		}
		elseif($method == 'DELETE'){
			$params = json_decode(file_get_contents('php://input'), TRUE);
			$venta = $this->venta_model->eliminarVenta($params['id']);
			json_output(200,$venta);
		}
		 else {
			json_output(400,array('Error' => 'Solicitud incorrecta.'));
		}
	}

	public function crearVenta()
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
			$venta = $this->venta_model->crearVenta($params);
			json_output(200,$venta);
		}
	}

	public function editarVenta()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		if($method == "OPTIONS")
        {
            die();
        }
		if($method != 'PUT'){
			json_output(400,array('status' => 400,'message' => 'Solicitud incorrecta.'));
		} else {
			$params = json_decode(file_get_contents('php://input'), TRUE);
			$venta = $this->venta_model->editarVenta($params);
			json_output(200,$venta);
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