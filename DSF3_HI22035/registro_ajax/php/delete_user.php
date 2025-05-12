<?php
require 'db.php';

$id = intval($_POST['id']);
$stmt = $conn->prepare("DELETE FROM usuarios WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
  echo json_encode(['success' => true, 'message' => 'Usuario eliminado']);
} else {
  echo json_encode(['success' => false, 'message' => 'Error al eliminar']);
}
?>
