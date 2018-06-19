<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Tipoproyecto_model extends CI_Model 
{

	public function __construct()
	{
		parent::__construct();
	}

	public function verTipoDeProyectos()
	{
		$query = $this->db->get('tipo_proyecto');
		if( $query->num_rows() < 0 )
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('message' => 'Success to request.', 'tipo_proyectos' => $query->result_array());
		}
	}

	public function crearTipoDeProyecto($tipo_proyecto)
	{
		$this->db->insert('tipo_proyecto', $tipo_proyecto);
		if(!$this->db->insert_id())
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('id_tipo_proyecto' => $this->db->insert_id());
		}
	}

	public function editarTipoDeProyecto($tipo_proyecto)
	{
		$data = array(
	        'id_tipo_proyecto' => $tipo_proyecto['id_tipo_proyecto'],
	        'nombre_tipo_proyecto' => $tipo_proyecto['nombre_tipo_proyecto']
		);
		$this->db->where('id_tipo_proyecto', $tipo_proyecto['id_tipo_proyecto']);
		if($this->db->update('tipo_proyecto', $data) <1)
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('id_tipo_proyecto' => $tipo_proyecto['id_tipo_proyecto']);
		}
	}

	public function eliminarTipoDeProyecto($id_tipo_proyecto)
	{
		if( !$this->db->delete('tipo_proyecto', array('id_tipo_proyecto' => $id_tipo_proyecto)))
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('status' => 200,'message' => 'Success to request.');
		}
	}
}