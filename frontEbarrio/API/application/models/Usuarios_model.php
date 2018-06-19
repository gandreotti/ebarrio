<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Usuarios_model extends CI_Model 
{

	public function __construct()
	{
		parent::__construct();
	}

	public function verificarLogin($usuario)
	{	
		$this->db->select('*');
		$this->db->from('usuarios');
		$this->db->where('correo', $usuario['correo']);
		$this->db->where('contrasena', $usuario['contrasena']);
		$query = $this->db->get();
		if( $query->num_rows() < 1 )
		{
			return array('status' => 400,'message' => 'Error');
		} else {
			return array('status' => 200, 'success' => 'Sesion Iniciada');
		}
	}
	public function verificarLoginAdmin($usuario)
	{	
		$this->db->select('*');
		$this->db->from('administradores');
		$this->db->where('correo', $usuario['correo']);
		$this->db->where('contrasena', $usuario['contrasena']);
		$query = $this->db->get();
		if( $query->num_rows() < 1 )
		{
			return array('status' => 400,'message' => 'Error');
		} else {
			return array('status' => 200, 'success' => 'Sesion Iniciada');
		}
	}

	
	public function verUsuariosID($correo)
	{
		$this->db->select('*');
		$this->db->from('usuarios');
		$this->db->where('correo', $correo['correo']);
		$query = $this->db->get();
		if( $query->num_rows() < 0 )
		{
			return array('status' => 400,'message' => 'Error');
		} else {
			return array('usuarios' => $query->result_array());
		}
	}
}