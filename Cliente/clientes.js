const headers = ['ID','EMPRESA','NOMBRE','IDENTIFICACION','APELLIDO','DIRECCION','EMAIL','RAZON SOCIAL','FECHA DE INICIO','ACCIONES'];

for (const headerText of headers) {
    const headerElement = document.createElement("th");

    headerElement.textContent = headerText;
    thead.querySelector("tr").appendChild(headerElement);
}