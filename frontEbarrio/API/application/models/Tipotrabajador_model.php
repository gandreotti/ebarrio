<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Tipotrabajador_model extends CI_Model 
{

	public function __construct()
	{
		parent::__construct();
	}

	public function verTipoDeTrabajadores()
	{
		$query = $this->db->get('tipo_trabajador');
		if( $query->num_rows() < 0 )
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('tipoTrabajadores' => $query->result_array());
		}
	}

	public function crearTipoDeTrabajador($tipoTrabajador)
	{
		$this->db->insert('tipo_trabajador', $tipoTrabajador);
		if(!$this->db->insert_id())
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('id_tipo_trabajador' => $this->db->insert_id());
		}
	}

	public function editarTipoDeTrabajador($tipoTrabajador)
	{
		$data = array(
	        'id_tipo_trabajador' => $tipoTrabajador['id_tipo_trabajador'],
	        'nombre_tipo_trabajador' => $tipoTrabajador['nombre_tipo_trabajador']
		);
		$this->db->where('id_tipo_trabajador', $tipoTrabajador['id_tipo_trabajador']);
		if($this->db->update('tipo_trabajador', $data) <1)
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('id_tipo_trabajador' => $tipoTrabajador['id_tipo_trabajador']);
		}
	}

	public function eliminarTipoDeTrabajador($id_tipo_trabajador)
	{
		if( !$this->db->delete('tipo_trabajador', array('id_tipo_trabajador' => $id_tipo_trabajador)))
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('status' => 200,'message' => 'Success to request.');
		}
	}

}