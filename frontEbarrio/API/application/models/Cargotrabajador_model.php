<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Cargotrabajador_model extends CI_Model 
{

	public function __construct()
	{
		parent::__construct();
	}

	public function verCargoDeTrabajadores()
	{
		$query = $this->db->get('cargo_trabajador');
		if( $query->num_rows() < 0 )
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('cargoTrabajadores' => $query->result_array());
		}
	}

	public function crearCargoDeTrabajador($cargoTrabajador)
	{
		$this->db->insert('cargo_trabajador', $cargoTrabajador);
		if(!$this->db->insert_id())
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('id_cargo_trabajador' => $this->db->insert_id());
		}
	}

	public function editarCargoDeTrabajador($cargoTrabajador)
	{
		$data = array(
	        'id_cargo_trabajador' => $cargoTrabajador['id_cargo_trabajador'],
	        'nombre_cargo_trabajador' => $cargoTrabajador['nombre_cargo_trabajador']
		);
		$this->db->where('id_cargo_trabajador', $cargoTrabajador['id_cargo_trabajador']);
		if($this->db->update('cargo_trabajador', $data) <1)
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('id_cargo_trabajador' => $cargoTrabajador['id_cargo_trabajador']);
		}
	}

	public function eliminarCargoDeTrabajador($id_cargo_trabajador)
	{
		if( !$this->db->delete('cargo_trabajador', array('id_cargo_trabajador' => $id_cargo_trabajador)))
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('status' => 200,'message' => 'Success to request.');
		}
	}

}