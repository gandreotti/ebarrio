<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Cargahoras_model extends CI_Model 
{

	public function __construct()
	{
		parent::__construct();
	}

	public function crearCargaHoras($cargaHoras)
	{
		$this->db->insert('carga_horas', $cargaHoras);
		if(!$this->db->insert_id())
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('id_cargaHoras' => $this->db->insert_id());
		}
	}

	public function verCargasDeTrabajador($trabajador)
	{

		$this->db->select('proyecto.nombre_proyecto, tarea.nombre_tarea, carga_horas.fecha_carga_horas, carga_horas.fecha_insert, carga_horas.id_tarea, carga_horas.nhoras_carga_horas, carga_horas.id_carga_horas');
		$this->db->from('carga_horas');
		$this->db->join('tarea', 'carga_horas.id_tarea = tarea.id_tarea');
		$this->db->join('proyecto', 'tarea.id_proyecto = proyecto.id_proyecto');
		$this->db->where('id_trabajador', $trabajador['id_trabajador']);
		$this->db->order_by('id_tarea', 'desc');

		$query = $this->db->get();


		//$query = $this->db->where('id_trabajador', $trabajador['id_trabajador'])->get('carga_horas');
		if( $query->num_rows() < 0 )
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('message' => 'Success to request.', 'cargasDeTrabajador' => $query->result_array());
		}
	}

	public function editarCargaDeTrabajador($cargaHoras)
	{
		$data = array(
	        'obs_carga_horas' => $cargaHoras['obs_carga_horas'],
	        'nhoras_carga_horas'  => $cargaHoras['nhoras_carga_horas'],
	        'fecha_carga_horas'  => $cargaHoras['fecha_carga_horas'],
	        'id_tarea'  => $cargaHoras['id_tarea'],
	        'id_trabajador'  => $cargaHoras['id_trabajador'],
	        'fecha_insert'  => $cargaHoras['fecha_insert']
		);
		$this->db->where('id_carga_horas', $cargaHoras['id_carga_horas']);
		if($this->db->update('carga_horas', $data) <1)
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('id_tarea' => $cargaHoras['id_carga_horas']);
		}
	}

	public function eliminarCargaDeTrabajador($id_carga_horas)
	{
		if( !$this->db->delete('carga_horas', array('id_carga_horas' => $id_carga_horas)))
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('status' => 200,'message' => 'Success to request.');
		}
	}
  
}