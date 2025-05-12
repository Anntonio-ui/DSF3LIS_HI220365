<?php
require 'db.php';
$result = $conn->query("SELECT id, nombre, correo, fecha_nacimiento FROM usuarios ORDER BY id DESC");
$users = [];

while ($row = $result->fetch_assoc()) {
  $users[] = $row;
}
echo json_encode($users);
?>
