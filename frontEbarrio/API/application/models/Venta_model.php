<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Venta_model extends CI_Model 
{

	public function __construct()
	{
		parent::__construct();
	}

	public function verVentas()
	{
		$query = $this->db->get('ventas');
		if( $query->num_rows() < 0 )
		{
			return array('status' => 400,'message' => 'Error');
		} else {
			return array('ventas' => $query->result_array());
		}
	}

	public function crearVenta($venta)
	{
		$this->db->insert('ventas', $venta);
		if(!$this->db->insert_id())
		{
			return array('status' => 400,'message' => 'Error');
		} else {
			return array('id' => $this->db->insert_id());
		}
	}

	public function editarVenta($venta)
	{
		$data = array(
	        'id' => $venta['id'],
	        'nombre' => $venta['nombre'],
	        'producto' => $venta['producto'],
	        'precio' => $venta['precio']
		);
		$this->db->where('id', $venta['id']);
		$this->db->update('ventas', $data);
		$this->db->trans_complete();
		$result = $this->db->affected_rows();
		if($result == 0)
		{
			return array('status' => 400,'message' => 'Error');
		} else {
			return array('message' => 'Edicion exitosa');
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