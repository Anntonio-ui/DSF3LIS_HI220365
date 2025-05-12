<?php
require 'db.php';

$nombre = $_POST['nombre'];
$correo = $_POST['correo'];
$password = $_POST['password'];
$fecha = $_POST['fecha_nacimiento'];

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
  echo json_encode(['success' => false, 'message' => 'Correo no válido']);
  exit;
}

$password_hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO usuarios (nombre, correo, password, fecha_nacimiento) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $nombre, $correo, $password_hash, $fecha);

if ($stmt->execute()) {
  echo json_encode(['success' => true, 'message' => 'Usuario registrado con éxito']);
} else {
  echo json_encode(['success' => false, 'message' => 'Error al registrar']);
}
?>
