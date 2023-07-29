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

// Crear una función para la operación de conversión
/**
 * 
 * @param {Number} val es valor
 * @param {Number} fromCurr moneda inicial
 * @param {Number} toCurr moneda a convertir
 */
function convert(val,fromCurr,toCurr){
    // declarar una variables locales
    let v = (val/rates[fromCurr]) * rates[toCurr];
    let v1 = v.toFixed(3);
    // validar con un if ternario
    return v1 ==0.0 ? v.toFixed(5) : v1;

}

// crear la función para conocer las tasas de conversión
function displayRate(){
    // declarar variables locales
    let v1 = sel1.value;
    let v2 = sel2.value;

    // imprimir los valores en los elementos HTML
    let val = convert(1, v1 , v2);
    rate1.innerHTML = `1 ${v1} equals-(valor)`;
    rate2.innerHTML = `${val} ${v2}`;

}

// listener o evento click del botón, con una función de flecha () =>
resultBtn.addEventListener('click', () =>{
    // declarar variables locales
    let fromCurr = sel1.value;
    let fromVal = parseFloat(inpt1.value);
    let toCurr = sel2.value;

    // validar con un condicional if, si hay o no un número y mostrar una alerta
    if (isNaN(fromVal)) {
        alert('Ingresar un número, por favor');
    }else{
        let cVal = convert(fromVal,fromCurr,toCurr);
        inpt2.value = cVal;
    }

});

// listener para realizar conversión inversa

selects.forEach(s => s.addEventListener("change",displayRate));

document.querySelector('.swap').addEventListener("click", () =>{
    // declarar variables
    let in1 = inpt1.value;
    let in2 = inpt2.value;
    let op1 = sel1.value;
    let op2 = sel2.value;

    inpt2.value = in1;
    inpt1.value = in2;
    
    sel2.value = op1;
    sel1.value = op2;


    //utilizar la función de selección de los valores de monedas  
    displayRate();

});