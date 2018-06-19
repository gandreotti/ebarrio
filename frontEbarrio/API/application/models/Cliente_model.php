<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Cliente_model extends CI_Model 
{

	public function __construct()
	{
		parent::__construct();
	}

	public function verClientes()
	{
		$query = $this->db->get('cliente');
		if( $query->num_rows() < 0 )
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('message' => 'Success to request.', 'clientes' => $query->result_array());
		}
	}

	public function crearCliente($cliente)
	{
		$this->db->insert('cliente', $cliente);
		if(!$this->db->insert_id())
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('id_cliente' => $this->db->insert_id());
		}
	}

	public function editarCliente($cliente)
	{
		$data = array(
	        'id_cliente' => $cliente['id_cliente'],
	        'nombre_cliente' => $cliente['nombre_cliente']
		);
		$this->db->where('id_cliente', $cliente['id_cliente']);
		if($this->db->update('cliente', $data) <1)
		{
			return array('status' => 400,'message' => 'Usuario no encontrado.');
		} else {
			return array('id_cliente' => $cliente['id_cliente']);
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