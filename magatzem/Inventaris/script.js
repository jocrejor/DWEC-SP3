document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    //Canvi d'usuaris i afegim els rols
    const userProfile = [
        { id: 1, name: "Administrador" },
        { id: 2, name: "Encarregat" },
        { id: 3, name: "Operari" }
    ];

    const users = [
        {
            email: "lorenzocremonese@gmail.com",
            password: "Lorenzo27!",
            role: "1",
            image: "img/face.png"
        },
        {
            email: "ivanlloret@gmail.com",
            password: "Ivan9900!",
            role: "2",
            image: "img/face.png"
        },
        {
            email: "adrianavarro@gmail.com",
            password: "Adria11!",
            role: "3",
            image: "img/face.png"
        },
        {
            email: "lorenasiscar@gmail.com",
            password: "Lorena222!",
            role: "3",
            image: "img/face.png"
        }
    ];

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.email === username && user.password === password);

    if (user) {
        localStorage.setItem('usuari', JSON.stringify({ email: user.email, role: user.role }));

        //Redirecciò a diferents  pàgines segons el rol
        switch (user.role) {
            case "1": // Administrador
                window.location.href = './html/generaInventari.html';
                break;
            case "2": // Encarregat
                window.location.href = './html/generaInventari.html';
                break;
            case "3": // Operari
                window.location.href = './html/llistaInventari.html';
                break;
            default:
                alert('Rol desconegut');
        }
    } else {
        alert('Usuari o contrasenya incorrectes. Torna a intentar-ho.');
        document.getElementById('loginForm').reset();
    }
});
