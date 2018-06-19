<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Trabajador_model extends CI_Model 
{

	public function __construct()
	{
		parent::__construct();
	}

	public function verTrabajadores()
	{
		$query = $this->db->get('trabajador');
		if( $query->num_rows() < 0 )
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('trabajadores' => $query->result_array());
		}
	}

	public function crearTrabajador($trabajador)
	{
		$this->db->insert('trabajador', $trabajador);
		if(!$this->db->insert_id())
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('id_trabajador' => $this->db->insert_id());
		}
	}

	public function editarTrabajador($trabajador)
	{
		$data = array(
	        'id_trabajador' => $trabajador['id_trabajador'],
	        'nombre_trabajador' => $trabajador['nombre_trabajador'],
	        'rut_trabajador'  => $trabajador['rut_trabajador'],
	        'fecha_nacimiento_trabajador'  => $trabajador['fecha_nacimiento_trabajador'],
	        'email_trabajador'  => $trabajador['email_trabajador'],
	        'fono_trabajador'  => $trabajador['fono_trabajador'],
	        'id_tipo_trabajador'  => $trabajador['id_tipo_trabajador'],
	        'id_cargo_trabajador'  => $trabajador['id_cargo_trabajador']
		);
		$this->db->where('id_trabajador', $trabajador['id_trabajador']);
		if($this->db->update('trabajador', $data) <1)
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('id_trabajador' => $trabajador['id_trabajador']);
		}
	}

	public function eliminarTrabajador($id_trabajador)
	{
		if( !$this->db->delete('trabajador', array('id_trabajador' => $id_trabajador)))
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('status' => 200,'message' => 'Success to request.');
		}
	}

}