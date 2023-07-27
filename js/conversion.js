// declarar variables para la captura de datos
let rate1 = document.querySelector('.rate1');
let rate2 = document.querySelector('.rate2');
let resultBtn = document.querySelector('.result');
let selects = document.querySelectorAll('.options select');
let sel1 = selects[0];
let sel2 = selects[1];
let inputs = document.querySelectorAll('.input input');
let inpt1 = inputs[0];
let inpt2 = inputs[1];

let rates ={};
let resquestUrl = "https://api.exchangerate.host/latest?base=USD";

// utilizar la función de tomas las monedas de la api
fetchRates();

// crear la función async para tomar las monedas de la api
async function fetchRates(){
    // declarar una variable local
    let res = await fetch(resquestUrl);
    res = await res.json();
    rates = res.rates;

    // utilizar la función de las options de monedas
    populteOptions();

}

// crear la función para las opciones
function populteOptions() {
    // declara una variable para el val, con valor vacio
    let val = '';
    Object.keys(rates).forEach(code => {
         let str = `<option value="${code}">${code}</option>`;
        //  incrementar el option hasta la última moneda
        // val = val + str;
        val += str;
    })
    // mostrar los options
    selects.forEach((s) => (s.innerHTML = val));
}