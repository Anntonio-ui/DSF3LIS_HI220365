<?php
$host = 'localhost';
$user = 'root';
$pass = '123456';
$db = 'registro_ajax';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  die(json_encode(['success' => false, 'message' => 'Error de conexión']));
}
?>
