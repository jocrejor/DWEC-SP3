window.onload = iniciar;

//url = 'http://localhost:5002/';

function iniciar() {
    editUser();
    console.log('hola');
    var userToEdit = JSON.parse(localStorage.getItem("userToEdit"));
    console.log(userToEdit)
    document.getElementById("saveChanges").addEventListener("click", saveChanges);
}

function editUser() {
    var userToEdit = JSON.parse(localStorage.getItem("userToEdit"));
    console.log(userToEdit)

    if (userToEdit) {
        document.getElementById("name").value = userToEdit.name;
        document.getElementById("email").value = userToEdit.email;
        document.getElementById("password").value = userToEdit.password;
        document.getElementById("role").value = userToEdit.user_profile;
    }
}

// Función para guardar los cambios
async function saveChanges(e) {
    e.preventDefault();

    let userToEdit = JSON.parse(localStorage.getItem("userToEdit"));

    var updatedUser = {
        id: userToEdit.id,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        user_profile: document.getElementById("role").value,
    };

    console.log(updatedUser);

   await updateId(url, 'Users', userToEdit.id, updatedUser);
   
   localStorage.removeItem('userToEdit');
    window.location.href = "../llistat/gestioUsuaris.html"; 
}

