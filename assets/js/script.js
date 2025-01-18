let chartInstance;


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
renderizarGrafico(moneda)
} catch (error) {
    console.log(error);
}
}

async function renderizarGrafico(moneda){
    try {
        const response = await fetch (`https://mindicador.cl/api/${moneda}`)
        const data = await response.json();
       console.log("data grafico: ",JSON.stringify(data,null,4));


        const datosInvertidos = data.serie.slice(0,10).reverse()
        const labels = datosInvertidos.map(item => item.fecha.slice(0,10));
        const valores = datosInvertidos.map(item => item.valor);
        const ctx = document.getElementById("grafico").getContext("2d");

        chartInstance = new Chart( ctx,{
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: `Ultimos 10 dias(${moneda})`,
                    data: valores,
                    borderColor: "rgb(216, 28, 28)"
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
            }
        }

        )
    } catch (error) {
        
    }
}