<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Estadistica_model extends CI_Model 
{

	public function __construct()
	{
		parent::__construct();
	}

	public function verEstadistica()
	{
		$query = $this->db->get('estadistica_percentil');
		if( $query->num_rows() < 0 )
		{
			return array('status' => 400,'message' => 'Error');
		} else {
			return array('estadistica_percentil' => $query->result_array());
		}
	}

}