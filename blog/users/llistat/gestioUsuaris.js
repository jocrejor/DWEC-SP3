window.onload = iniciar;

//url = 'http://localhost:5002/';
let users;
async function iniciar() {
    listUsers();
    document.getElementById("searchUser").addEventListener("click", search);
    document.getElementById("cleanFilters").addEventListener("click", cleanFilters);
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
    var tbody = document.getElementById("users-list");

    let currentUSer = JSON.parse(localStorage.getItem('currentUser'));
    // Limpiar el contenido actual del tbody
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    users.forEach(user => {
        // Crear una nueva fila
        var tr = document.createElement("tr");

        // Crear columnas para los botones de borrar y modificar
        var tdDelete = document.createElement("td");
        if( user.id != currentUSer.id){
            var btnDelete = document.createElement("button");
            btnDelete.className = "btn btn-primary btn-lg";
            btnDelete.appendChild(document.createTextNode("Esborrar"));
            btnDelete.addEventListener("click", async function() {
                let posts = await getData(url, 'Post');
                console.table(posts);
                let exists;
                for (let i = 0; i < posts.length; i++){
                    if(posts[i].creator_id === user.id){
                        exists = 1;
                        console.log(posts[i].creator_id);
                    }
                }
                console.log(exists);
                if(!exists && confirm('¿Desea eliminar a ' + user.name + '?')){
                    deleteData(url, 'Users', user.id); // Función para borrar el usuario
                    tbody.removeChild(tr);
                } 
                if(exists){
                    alert("No puede eliminiar usuarios que hayan realizado un post.");
                }   
            });
            tdDelete.appendChild(btnDelete);
        }
       
        

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
        tdName.setAttribute("data-label", "Nombre:")
        tdName.appendChild(document.createTextNode(user.name));

        var tdEmail = document.createElement("td");
        tdEmail.setAttribute("data-label", "Correo:")
        tdEmail.appendChild(document.createTextNode(user.email));

        var tdRole = document.createElement("td");
        tdRole.setAttribute("data-label", "Rol:");
        tdRole.appendChild(document.createTextNode(user.user_profile));

        // Añadir columnas a la fila
        tr.appendChild(tdDelete);
        tr.appendChild(tdEdit);
        tr.appendChild(tdName);
        tr.appendChild(tdEmail);
        tr.appendChild(tdRole);

        // Añadir la fila al tbody
        tbody.appendChild(tr);
    });
}

function altaUsuari() {
    window.location.href = "../alta/altaUsuaris.html";
}


async function modifyUser(id) {
    let users = await getData(url, 'Users');
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
    let users = await getData(url, 'Users');
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

function search () {
    let name         = document.getElementById("name").value.toLowerCase();
    let email        = document.getElementById("email").value.toLowerCase();
    let user_profile = document.getElementById("user_profile");
    let role = user_profile.options[user_profile.selectedIndex].text;

    if(role === "Seleccione el rol"){
        role = "";
    }

    let rows = document.querySelectorAll("#users-list tr"); // Todas las filas de la tabla
   
    rows.forEach(row => {
        let tdName = row.querySelector("td[data-label='Nombre:']");
        let tdEmail = row.querySelector("td[data-label='Correo:']");
        let tdRole = row.querySelector("td[data-label='Rol:']");
        

        let match = true;
        if (name && tdName && !tdName.textContent.toLowerCase().includes(name)) {
            match = false;
        }

        if (email && tdEmail && !tdEmail.textContent.toLowerCase().includes(email)) {
            match = false;
        }

        if (role && tdRole && tdRole.textContent !== role) {
            match = false;
        }

        // Muestra u oculta una línea según el resultado
        row.style.display = match ? "" : "none";
        
    });
}

function cleanFilters () {
    let name         = document.getElementById("name").value;
    let email        = document.getElementById("email").value;
    let user_profile = document.getElementById("user_profile").value;

    name         = "";
    email        = "";
    user_profile = "";

    window.location.href = "gestioUsuaris.html";
}