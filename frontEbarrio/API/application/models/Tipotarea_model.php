<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Tipotarea_model extends CI_Model 
{

	public function __construct()
	{
		parent::__construct();
	}

	public function verTiposDeTareas()
	{
		$query = $this->db->get('tipo_tarea');
		if( $query->num_rows() < 0 )
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('message' => 'Success to request.', 'tiposDeTareas' => $query->result_array());
		}
	}

	public function crearTipoDeTarea($tipo_tarea)
	{
		$this->db->insert('tipo_tarea', $tipo_tarea);
		if(!$this->db->insert_id())
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('tipoDeTarea' => $this->db->insert_id());
		}
	}

	public function editarTipoDeTarea($tipo_tarea)
	{
		$data = array(
	        'id_tipo_tarea' => $tipo_tarea['id_tipo_tarea'],
	        'nombre_tipo_tarea' => $tipo_tarea['nombre_tipo_tarea']
		);
		$this->db->where('id_tipo_tarea', $tipo_tarea['id_tipo_tarea']);
		if($this->db->update('tipo_tarea', $data) <1)
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('id_tipo_tarea' => $tipo_tarea['id_tipo_tarea']);
		}
	}

	public function eliminarTipoDeTarea($id_tipo_tarea)
	{
		if( !$this->db->delete('tipo_tarea', array('id_tipo_tarea' => $id_tipo_tarea)))
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('status' => 200,'message' => 'Success to request.');
		}
	}
  
}