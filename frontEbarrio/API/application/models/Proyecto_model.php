<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Proyecto_model extends CI_Model 
{

	public function __construct()
	{
		parent::__construct();
	}

	public function verProyectos()
	{
		$query = $this->db->get('proyecto');
		if( $query->num_rows() < 0 )
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('message' => 'Success to request.', 'proyectos' => $query->result_array());
		}
	}

	public function crearProyecto($proyecto)
	{
		$this->db->insert('proyecto', $proyecto);
		//print_r($this->db->insert());
		if(!$this->db->insert_id())
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('id_proyecto' => $this->db->insert_id());
		}
	}

	public function editarProyecto($proyecto)
	{
		$data = array(
	        'id_cliente' => $proyecto['id_cliente'],
	        'id_tipo_proyecto'  => $proyecto['id_tipo_proyecto'],
	        'nombre_proyecto'  => $proyecto['nombre_proyecto']
		);
		$this->db->where('id_proyecto', $proyecto['id_proyecto']);
		if($this->db->update('proyecto', $data) <1)
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('id_proyecto' => $proyecto['id_proyecto']);
		}
	}

	public function eliminarProyecto($id_proyecto)
	{
		if( !$this->db->delete('proyecto', array('id_proyecto' => $id_proyecto)))
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('status' => 200,'message' => 'Success to request.');
		}
	}
  
}

/* End of file Users_model.php */
/* Location: ./application/models/Users_model.php */