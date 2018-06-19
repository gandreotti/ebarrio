<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Qos_model extends CI_Model 
{

	public function __construct()
	{
		parent::__construct();
	}

	public function verQos()
	{
		$query = $this->db->get('qos');
		if( $query->num_rows() < 0 )
		{
			return array('status' => 400,'message' => 'Error');
		} else {
			return array('qos' => $query->result_array());
		}
	}

}