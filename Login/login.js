const usernameInput = document.querySelector("#username")
const passwordInput = document.querySelector("#password")
const loginButton = document.querySelector("#button")

function login() {
    const link = `http://localhost:8080/usuario/login?username=${usernameInput.value}&password=${passwordInput.value}`
    const xhr = new XMLHttpRequest();
    xhr.open('GET', link);

    xhr.onload = () => {
        console.log(xhr.status);
        if(xhr.status == 200) {
            open("/home/santiago/Documentos/ProyectoCrisalis/Home/Home.html", "_self");
        }
        if(xhr.status == 500) {
            alert("No se pudo iniciar sesión.")
        }
    }

    xhr.send();
}

loginButton.addEventListener("click", () => {
    if(usernameInput.value != "" || passwordInput.value != "") {
        login()
    } else {
        alert("Hay datos faltantes.")
    }
})