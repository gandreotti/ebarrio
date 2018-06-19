<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Consumos_model extends CI_Model 
{

	public function __construct()
	{
		parent::__construct();
	}

	public function verConsumo()
	{
		$query = $this->db->get('ventas');
		if( $query->num_rows() < 0 )
		{
			return array('status' => 400,'message' => 'Error');
		} else {
			return array('ventas' => $query->result_array());
		}
	}

	public function verPromedios()
	{
		$query = $this->db->get('promedios');
		if( $query->num_rows() < 0 )
		{
			return array('status' => 400,'message' => 'Error');
		} else {
			return array('ventas' => $query->result_array());
		}
	}

	public function verConsumoId($correo)
	{	
		
		$this->db->select('*');
		$this->db->from('consumos');
		$this->db->where('usuarios_correo', $correo['correo']);
		$query = $this->db->get();
		if( $query->num_rows() < 0 )
		{
			return array('status' => 400,'message' => 'Error');
		} else {
			return array('consumos' => $query->result_array());
		}
	}

	public function guardarMetas($meta)
	{
		$this->db->insert('metas', $meta);
		if(!$this->db->insert_id())
		{
			return array('status' => 400,'message' => 'Error');
		} else {
			return array('id' => $this->db->insert_id());
		}
	}

	public function guardarConsumo($consumo)
	{
		$this->db->insert('promedios', $consumo);
		if(!$this->db->insert_id())
		{
			return array('status' => 400,'message' => 'Error');
		} else {
			return array('id' => $this->db->insert_id());
		}
	}

	public function eliminarVenta($id)
	{
		if( !$this->db->delete('ventas', array('id' => $id)))
		{
			return array('status' => 400,'message' => 'Error');
		} else {
			return array('message' => 'Eliminado correctamente');
		}
	}
}