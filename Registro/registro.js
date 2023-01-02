const nombreInput = document.querySelector("#nombre")
const apellidoInput = document.querySelector("#apellido")
const usuarioInput = document.querySelector("#username")
const passwordInput = document.querySelector("#password")
const registroBtn = document.querySelector("#registrar-btn")

function registro() {
    if (nombreInput.value != "" && apellidoInput.value != "" && usuarioInput.value != "" && passwordInput.value != "") {
        if (confirm("Confirmar registro?") == false) {
            return
        }
        const link = 'http://localhost:8080/usuario/registro'
        const data = {
            nombre: nombreInput.value,
            apellido: apellidoInput.value,
            username: usuarioInput.value,
            password: passwordInput.value
        };
        const response = fetch(link, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => console.log(data))
    
        alert("Usuario Registrado");
    } else {
        alert ("Hay datos faltantes.")
    }
    
}

registroBtn.addEventListener("click", registro)