$(document).ready(function () {
  // Cargar lista de usuarios al iniciar
  cargarUsuarios();
  // Manejar el envío del formulario con validación 
  $('#userForm').on('submitAjax', function () {
    const formData = {
      nombre: this.nombre.value,
      correo: this.correo.value,
      password: this.password.value,
      fecha_nacimiento: this.fecha_nacimiento.value
    };

    $.post('php/add_user.php', formData, function (response) {
      $('#userForm')[0].reset();
      cargarUsuarios();
    }).fail(function () {
      alert("Error al registrar el usuario.");
    });
  });

  // Eliminar usuario
  $(document).on('click', '.btn-delete', function () {
    const id = $(this).data('id');

    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      $.post('php/delete_user.php', { id: id }, function () {
        cargarUsuarios();
      }).fail(() => alert("Error al eliminar"));
    }
  });

  // Mostrar modal de edición
  $(document).on('click', '.btn-edit', function () {
    const id = $(this).data('id');
    const nombre = $(this).data('nombre');
    const correo = $(this).data('correo');
    const fecha = $(this).data('fecha');

    const modal = $('#editModal');
    modal.find('[name=id]').val(id);
    modal.find('[name=nombre]').val(nombre);
    modal.find('[name=correo]').val(correo);
    modal.find('[name=fecha_nacimiento]').val(fecha);
    modal.removeClass('hidden');
  });

  // Cancelar edición
  $('#cancelEdit').click(function () {
    $('#editModal').addClass('hidden');
  });

  // Actualizar usuario
  $('#editForm').submit(function (e) {
    e.preventDefault();

    const formData = {
      id: this.id.value,
      nombre: this.nombre.value,
      correo: this.correo.value,
      fecha_nacimiento: this.fecha_nacimiento.value
    };

    $.post('php/update_user.php', formData, function () {
      $('#editModal').addClass('hidden');
      cargarUsuarios();
    }).fail(() => alert("Error al actualizar"));
  });

  // Función para cargar usuarios
  function cargarUsuarios() {
    $.get('php/get_users.php', function (data) {
      let html = '';
      data.forEach(user => {
        html += `
          <tr>
            <td class="px-4 py-2">${user.nombre}</td>
            <td class="px-4 py-2">${user.correo}</td>
            <td class="px-4 py-2">${user.fecha_nacimiento}</td>
            <td class="px-4 py-2 text-right space-x-2">
              <button class="btn-edit text-indigo-600 hover:text-indigo-800" data-id="${user.id}" data-nombre="${user.nombre}" data-correo="${user.correo}" data-fecha="${user.fecha_nacimiento}">
                <i data-lucide="pencil"></i>
              </button>
              <button class="btn-delete text-red-600 hover:text-red-800" data-id="${user.id}">
                <i data-lucide="trash-2"></i>
              </button>
            </td>
          </tr>
        `;
      });
      $('#usersTable').html(html);
      lucide.createIcons();
    }, 'json');
  }
});
