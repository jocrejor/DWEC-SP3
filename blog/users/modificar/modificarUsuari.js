window.onload = iniciar;

//url = 'http://localhost:5002/';

function iniciar() {
    editUser();
    document.getElementById("saveChanges").addEventListener("click", saveChanges);
}

function editUser() {
    var userToEdit = JSON.parse(localStorage.getItem("userToEdit"));
    console.log(userToEdit)

    if (userToEdit) {
        document.getElementById("name").value = userToEdit.name;
        document.getElementById("email").value = userToEdit.email;
        document.getElementById("password").value = userToEdit.password;

        let roles = document.getElementById("user_role");
        for(let i = 0; i < roles.length; i++){
            if(roles[i].text === userToEdit.user_profile){
                roles[i].selected = true;
            }
        }

    }
}

// Función para guardar los cambios
async function saveChanges(e) {
    e.preventDefault();

    let userToEdit = JSON.parse(localStorage.getItem("userToEdit"));
    let roles      = document.getElementById('user_role');

    var updatedUser = {
        id: userToEdit.id,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        user_profile: roles.options[roles.selectedIndex].text
    };

    console.log(updatedUser);

   await updateId(url, 'Users', userToEdit.id, updatedUser);
   
   localStorage.removeItem('userToEdit');
    window.location.href = "../llistat/gestioUsuaris.html"; 
}

