window.onload = iniciar;

function iniciar() {
    document.getElementById("nouUsuari").addEventListener("click", altaUsuari);
    document.getElementById("backToBlog").addEventListener("click", backToBlog);
    listUsers();
}

function gestioUsuaris() {
    defineRoles();
}

function listUsers() {
    var users = JSON.parse(localStorage.getItem("users")) || []; // Obtener los usuarios
    var tbody = document.getElementById("files");

    // Limpiar el contenido actual del tbody
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    for (var i = 0; i < users.length; i++) {
        var user = users[i];

        // Crear una nueva fila
        var tr = document.createElement("tr");

        // Crear columnas para los botones de borrar y modificar
        var tdDelete = document.createElement("td");
        var btnDelete = document.createElement("button");
        btnDelete.className = "btn btn-primary btn-lg";
        btnDelete.appendChild(document.createTextNode("Esborrar"));
        btnDelete.addEventListener("click", function() {
            deleteUser(user.id); // Función para borrar el usuario
        });
        tdDelete.appendChild(btnDelete);

        var tdEdit = document.createElement("td");
        var btnEdit = document.createElement("button");
        btnEdit.className = "btn btn-primary btn-lg";
        btnEdit.appendChild(document.createTextNode("Modificar"));
        btnEdit.addEventListener("click", function() {
            modifyUser(user.id); // Función para modificar el usuario
        });
        tdEdit.appendChild(btnEdit);

        // Crear columnas para los datos del usuario
        var tdName = document.createElement("td");
        tdName.appendChild(document.createTextNode(user.name));

        var tdEmail = document.createElement("td");
        tdEmail.appendChild(document.createTextNode(user.email));

        var tdPassword = document.createElement("td");
        tdPassword.appendChild(document.createTextNode(user.password));

        var tdRole = document.createElement("td");
        tdRole.appendChild(document.createTextNode(user.role));

        // Añadir columnas a la fila
        tr.appendChild(tdDelete);
        tr.appendChild(tdEdit);
        tr.appendChild(tdName);
        tr.appendChild(tdEmail);
        tr.appendChild(tdPassword);
        tr.appendChild(tdRole);

        // Añadir la fila al tbody
        tbody.appendChild(tr);
    }
}

function altaUsuari() {
    window.location.href = "altaUsuaris.html";
}

function deleteUser(id) {
    var users = JSON.parse(localStorage.getItem("users")) || []; // Obtener los usuarios

    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        if (user.id === id) {
            users.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("users", JSON.stringify(users));
    listUsers();
}

function modifyUser(id) {
    var users = JSON.parse(localStorage.getItem("users")) || []; // Obtener los usuarios

    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        if (user.id === id) {
            // Guardar los datos del usuario en localStorage temporalmente
            localStorage.setItem("userToEdit", JSON.stringify(users[i]));
            window.location.href = "modificarUsuari.html";
            break;
        }
    }
}

function backToBlog() {
    window.location.href = "blog.html";
}