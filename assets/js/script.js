async function convertirMoneda() {
const monto = document.getElementById("monto").value;
const moneda = document.getElementById("moneda").value;
const resultado = document.getElementById("resultado");

try {
    const response = await fetch("https://mindicador.cl/api")
    const data = await response.json();

let valorCambio = "";

if (moneda === "dolar"){
valorCambio = data.dolar.valor;
} else if(moneda === "euro") {
 valorCambio = data.euro.valor;
}

const conversion = ( monto / valorCambio );
resultado.innerText = `${conversion} ${moneda}
` 
} catch (error) {
    console.log(error);
}
}