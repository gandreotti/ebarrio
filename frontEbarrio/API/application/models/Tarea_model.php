<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Tarea_model extends CI_Model 
{

	public function __construct()
	{
		parent::__construct();
	}

	public function verTareasDeProyecto($proyecto)
	{
		$query = $this->db->where('id_proyecto', $proyecto['id_proyecto'])->get('tarea');
		if( $query->num_rows() < 0 )
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('message' => 'Success to request.', 'tareas' => $query->result_array());
		}
	}

	public function crearTarea($tarea)
	{
		$this->db->insert('tarea', $tarea);
		//print_r($this->db->insert());
		if(!$this->db->insert_id())
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('id_tarea' => $this->db->insert_id());
		}
	}

	public function editarTarea($tarea)
	{
		$data = array(
	        'nombre_tarea' => $tarea['nombre_tarea'],
	        'horas_estimadas'  => $tarea['horas_estimadas'],
	        'fecha_ini'  => $tarea['fecha_ini'],
	        'fecha_fin'  => $tarea['fecha_fin'],
	        'finalizada'  => $tarea['finalizada'],
	        'id_tipo_tarea'  => $tarea['id_tipo_tarea'],
	        'id_proyecto'  => $tarea['id_proyecto']
		);
		$this->db->where('id_tarea', $tarea['id_tarea']);
		if($this->db->update('tarea', $data) <1)
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('id_tarea' => $tarea['id_tarea']);
		}
	}

	public function eliminarTarea($id_tarea)
	{
		if( !$this->db->delete('tarea', array('id_tarea' => $id_tarea)))
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('status' => 200,'message' => 'Success to request.');
		}
	}
  
}

/* End of file Users_model.php */
/* Location: ./application/models/Users_model.php */