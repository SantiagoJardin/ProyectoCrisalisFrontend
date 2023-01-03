const tableBody = document.querySelector("#tbody")
const tableHead = document.querySelector("#thead")

//variables empresa
const nombreE = document.querySelector("#nombreE")
const identificacionE = document.querySelector("#identificacionE")
const apellidoE = document.querySelector("#apellidoE")
const direccionE = document.querySelector("#direccionE")
const emailE = document.querySelector("#emailE")
const razonSocial = document.querySelector("#razon")
const fechaInicio = document.querySelector("#fecha")

//variables persona
const nombreP = document.querySelector("#nombreP")
const identificacionP = document.querySelector("#identificacionP")
const apellidoP = document.querySelector("#apellidoP")
const direccionP = document.querySelector("#direccionP")
const emailP = document.querySelector("#emailP")

//boton empresa o persona
const guardarBtn = document.querySelector("#guardar")
const guardarBtnp = document.querySelector("#guardarP")
const empresaBtn = document.querySelector("#modalEmpresa")

//links
const guardar = 'http://localhost:8080/cliente/guardar_cliente'
const lista = 'http://localhost:8080/cliente/lista'

let resultados = ''
const contenedor = document.querySelector("#data")
var empresa = false

//registro de clientes
function registroCliente() { 
    if (nombreE.value != "" && apellidoE.value != "" && identificacionE.value != "" && emailE.value != "" && direccionE.value != "" && razonSocial.value != "") {
        if (confirm("Confirmar registro?") == false) {
            return
        }

        if (empresa = true) {
            const data = {
                es_empresa : true,
                nombre : nombreE.value,
                apellido : apellidoE.value,
                direccion : direccionE.value,
                email : emailE.value,
                razon_social : razonSocial.value,
                fechaInicio : fechaInicio.value
            };
            const response = fetch(guardar, {
                method : 'POST',
                body : JSON.stringify(data),
                headers : {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => console.log(data))
            alert("Usuario registrado")
        } else if (empresa = false) {
            const data = {
                es_empresa : false,
                nombre : nombreP.value,
                apellido : apellidoP.value,
                direccion : direccionP.value,
                email : emailP.value,
                razon_social : null,
                fechaInicio : null
            };
            const response = fetch(guardar, {
                method : 'POST',
                body : JSON.stringify(data),
                headers : {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => console.log(data))
            alert("Usuario registrado")
    } else {
            alert ("Hay datos faltantes.")
        }
    }
}


empresaBtn.addEventListener("click", () => {
    empresa = true
    console.log(empresa)
})


guardarBtn.addEventListener("click", registroCliente)
guardarBtnp.addEventListener("click", registroCliente)



async function fetchDataFromDB(lista) {
    const response = await fetch(lista)
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
}

function cargarBody(data) {
    for(let dataObject of data) {
        console.log(dataObject)
        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);
        for(let i = 0; i < (dataObjectArray.length) - 2; i++) {
            const cellElement = document.createElement("td")

            cellElement.textContent = dataObjectArray[i][1];
            rowElement.appendChild(cellElement);
        }
        tableBody.appendChild(rowElement);
    }
}

async function refreshTable(urlHeaders, urlBody) {
    // Headers
    const headersResponse = await fetch(urlHeaders);
    const { headers } = await headersResponse.json();

    // Limpiar
    tableHead.innerHTML = "<tr></tr>";

    // Llenar
    for (const headerText of headers) {
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        tableHead.querySelector("tr").appendChild(headerElement); 
    }

    // Body
    tableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        cargarBody(data);
    });
}

refreshTable("./headers.json", lista)
