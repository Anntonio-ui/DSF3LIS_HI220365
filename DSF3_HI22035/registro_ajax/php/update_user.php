<?php
require 'db.php';

$id = intval($_POST['id']);
$nombre = $_POST['nombre'];
$correo = $_POST['correo'];
$fecha = $_POST['fecha_nacimiento'];

// Validación básica
if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
  echo json_encode(['success' => false, 'message' => 'Correo no válido']);
  exit;
}

$stmt = $conn->prepare("UPDATE usuarios SET nombre = ?, correo = ?, fecha_nacimiento = ? WHERE id = ?");
$stmt->bind_param("sssi", $nombre, $correo, $fecha, $id);

if ($stmt->execute()) {
  echo json_encode(['success' => true, 'message' => 'Usuario actualizado con éxito']);
} else {
  echo json_encode(['success' => false, 'message' => 'Error al actualizar usuario']);
}
?>
