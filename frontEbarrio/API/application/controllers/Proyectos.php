<?php
if(!defined('BASEPATH')) exit('No direct script access allowed');
//require(APPPATH'.libraries/REST_Controller.php');

class Proyectos extends CI_Controller {

	public function __construct()
	{
		// header('Access-Control-Allow-Origin: *');
	 //    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
	 //    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	    $method = $_SERVER['REQUEST_METHOD'];
	    if($method == "OPTIONS") {
	        die();
	    }

		parent::__construct();
		$this->load->model('proyectos_model');
		$this->output->enable_profiler(FALSE);
	}

	public function verProyectos()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		if($method == "OPTIONS")
        {
            die();
        }
		if($method != 'GET'){
			json_output(400,array('status' => 400,'message' => 'Solicitud incorrecta.'));
		} else {
			$proyectos = $this->proyectos_model->verProyectos();
			json_output(200,$proyectos);
		}
	}

	public function verProyectoId()
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
			$proyecto = $this->proyectos_model->verProyectoId($params);
			json_output(200,$proyecto['proyecto'][0]);
		}
	}

	public function aprobarProyecto()
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
			$proyecto = $this->proyectos_model->apro($params);
			json_output(200,$proyecto);
		}
	}

	public function crearProyecto()
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
			$proyecto = $this->proyectos_model->crearProyecto($params);
			json_output(200,$proyecto);
		}
	}

	public function verParticipantes()
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
			$participante = $this->proyectos_model->verParticipantes($params);
			json_output(200,$participante['participantes']);
		}
	}

	public function editarProyecto()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		if($method == "OPTIONS")
        {
            die();
        }
		if($method != 'GET'){
			json_output(400,array('status' => 400,'message' => 'Solicitud incorrecta.'));
		} else {
			$params = json_decode(file_get_contents('php://input'), TRUE);
			$proyecto = $this->proyectos_model->editarProyecto($params);
			json_output(200,$proyecto);
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