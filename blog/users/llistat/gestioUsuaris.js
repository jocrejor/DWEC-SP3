window.onload = iniciar;

//url = 'http://localhost:5002/';
let users;
async function iniciar() {
    listUsers();
    
    console.log(users);
    document.getElementById("nouUsuari").addEventListener("click", altaUsuari);
    document.getElementById("backToBlog").addEventListener("click", backToBlog);
    $('#funnel').click(() => {
        if($('#panel').css('display') === 'none')
            $('#panel').fadeIn(500);
        else{
            $('#panel').fadeOut(500); 
        }
    })
    autocompleteFilters();
}

function gestioUsuaris() {
    defineRoles();
}

async function listUsers() {
    var users = await getData(url, 'Users') ?? []; // Obtener los usuarios
    var tbody = document.getElementById("files");

    // Limpiar el contenido actual del tbody
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    users.forEach(user => {
        // Crear una nueva fila
        var tr = document.createElement("tr");

        // Crear columnas para los botones de borrar y modificar
        var tdDelete = document.createElement("td");
        var btnDelete = document.createElement("button");
        btnDelete.className = "btn btn-primary btn-lg";
        btnDelete.appendChild(document.createTextNode("Esborrar"));
        btnDelete.addEventListener("click", function() {
            console.log(user.id);
            deleteData(url, 'Users', user.id); // Función para borrar el usuario
            tbody.removeChild(tr);
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
        tdRole.appendChild(document.createTextNode(user.user_profile));

        // Añadir columnas a la fila
        tr.appendChild(tdDelete);
        tr.appendChild(tdEdit);
        tr.appendChild(tdName);
        tr.appendChild(tdEmail);
        tr.appendChild(tdPassword);
        tr.appendChild(tdRole);

        // Añadir la fila al tbody
        tbody.appendChild(tr);
    });
}

function altaUsuari() {
    window.location.href = "../alta/altaUsuaris.html";
}


async function modifyUser(id) {
    
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (user.id === id) {
            console.log(id)
            localStorage.setItem("userToEdit", JSON.stringify(user));
            window.location.href = "../modificar/modificarUsuari.html";
            break;
        }
    }
}

function backToBlog() {
    window.location.href = "../../index.html";
}



async function autocompleteFilters () {
    let users = users = await getData(url, 'Users');
    let names = [];
    let email = [];
    let role = ['Administrador', 'Editor', 'Publicador'];
    
    users.forEach(user => {
        names.push(user.name);
        email.push(user.email);   
    });
    
    console.log(names);
    console.log(email);
    $('#name').autocomplete ({
        source: names
    });

    $('#email').autocomplete({
        source:email
    });

    $('#role').autocomplete({
        source:role
    })
    
}