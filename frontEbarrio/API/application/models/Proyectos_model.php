<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Proyectos_model extends CI_Model 
{

	public function __construct()
	{
		parent::__construct();
	}

	public function verProyectos()
	{
		$query = $this->db->get('proyectos');
		if( $query->num_rows() < 0 )
		{
			return array('status' => 400,'message' => 'proyecto no encontrado.');
		} else {
			return array('message' => 'Success to request.', 'proyectos' => $query->result_array());
		}
	}

	public function verProyectoId($id)
	{	
		
		$this->db->select('*');
		$this->db->from('proyectos');
		$this->db->where('idproyectos', $id['id']);
		$query = $this->db->get();
		if( $query->num_rows() < 0 )
		{
			return array('status' => 400,'message' => 'Error');
		} else {
			return array('proyecto' => $query->result_array());
		}
	}

	public function aprobarProyecto($proyecto)
	{
		$this->db->insert('proyectos', $proyecto);
		if(!$this->db->insert_id())
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('idproyectos' => $this->db->insert_id());
		}
	}

	public function crearProyecto($proyecto)
	{
		$this->db->insert('proyectos', $proyecto);
		if(!$this->db->insert_id())
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('idproyectos' => $this->db->insert_id());
		}
	}

	public function editarProyecto($proyecto)
	{
		$data = array(
	        'idproyectos' => $proyecto['id'],
	        'estado' => $proyecto['estado']
		);
		$this->db->where('idproyectos', $proyecto['id']);
		if($this->db->update('proyectos', $data) <1)
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('idproyectos' => $proyecto['idproyectos']);
		}
	}

	public function unirProyecto($proyecto)
	{
		$this->db->insert('proyectos', $proyecto);
		if(!$this->db->insert_id())
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('idproyectos' => $this->db->insert_id());
		}
	}

	public function verParticipantes($participante)
	{
		$this->db->select('*');
		$this->db->from('usuarios_has_proyectos');
		$this->db->where('proyectos_idproyectos', $participante['id']);
		$this->db->join('usuarios', 'usuarios.correo = usuarios_has_proyectos.usuarios_correo');
		$query = $this->db->get();
		if( $query->num_rows() < 0 )
		{
			return array('status' => 400,'message' => 'Error');
		} else {
			return array('participantes' => $query->result_array());
		}
	}

	

	public function eliminarCliente($id_cliente)
	{
		if( !$this->db->delete('cliente', array('id_cliente' => $id_cliente)))
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('status' => 200,'message' => 'Success to request.');
		}
	}
}