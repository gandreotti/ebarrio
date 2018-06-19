<?php
if(!defined('BASEPATH')) exit('No direct script access allowed');
//require(APPPATH'.libraries/REST_Controller.php');

class Usuarios extends CI_Controller {

	public function __construct()
	{
	    $method = $_SERVER['REQUEST_METHOD'];
	    if($method == "OPTIONS") {
	        die();
	    }
		parent::__construct();
		$this->load->model('usuarios_model');
		$this->output->enable_profiler(FALSE);
	}

	public function verificarLogin()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		if($method != 'GET'){
			json_output(400,array('status' => 400,'message' => 'Solicitud incorrecta.'));
		} else {
			$params = $this->input->get();
			$usuario = $this->usuarios_model->verificarLogin($params);
			if($usuario['status'] == 400){
				json_output(400,$usuario);
			}else{
				json_output(200,$usuario);
			}
		}
	}

	public function verificarLoginAdmin()
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
			$usuario = $this->usuarios_model->verConsumoId($params);
			json_output(200,$usuario['usuarios'][0]);
		}
	}

	public function verUsuariosID()
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
			$usuario = $this->usuarios_model->verUsuariosId($params);
			json_output(200,$usuario['usuarios'][0]);
		}
	}

}