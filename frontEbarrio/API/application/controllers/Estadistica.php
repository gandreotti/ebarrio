<?php
if(!defined('BASEPATH')) exit('No direct script access allowed');
//require(APPPATH'.libraries/REST_Controller.php');

class Estadistica extends CI_Controller {

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
		$this->load->model('estadistica_model');
		$this->output->enable_profiler(FALSE);
	}

	public function verEstadistica()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		if($method == "OPTIONS")
        {
            die();
        }
		if($method == 'GET'){
			$estadisticas = $this->estadistica_model->verEstadistica();
			json_output(200,$estadisticas);
		}
		 else {
			json_output(400,array('Error' => 'Solicitud incorrecta.'));
		}
	}


}