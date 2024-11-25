window.onload = iniciar;

let url = 'http://localhost:5002/';

function iniciar() {
    editUser();
    document.getElementById("saveChanges").addEventListener("click", saveChanges);
}

function editUser() {
    var userToEdit = JSON.parse(localStorage.getItem("userToEdit"));

    if (userToEdit) {
        document.getElementById("name").value = userToEdit.name;
        document.getElementById("email").value = userToEdit.email;
        document.getElementById("password").value = userToEdit.password;
        document.getElementById("role").value = userToEdit.role;
    }
}

// Función para guardar los cambios
function saveChanges(e) {
    e.preventDefault();

    var updatedUser = {
        id: JSON.parse(localStorage.getItem("userToEdit")).id,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value,
    };

    updatedUser(url, 'Users', updatedUser.id, updateUser)
    /*var users = JSON.parse(localStorage.getItem("users")) || [];
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === updatedUser.id) {
            users[i] = updatedUser; // Actualizar usuario
            break;
        }
    }

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.removeItem("userToEdit"); */// Limpiar el almacenamiento temporal
    window.location.href = "gestioUsuaris.html"; // Volver a la página de gestión
}

