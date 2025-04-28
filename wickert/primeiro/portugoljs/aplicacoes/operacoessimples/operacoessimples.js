
let printopresult = document.getElementById('printopresult')
let resultado
function soma() {
    let a = parseFloat(document.getElementById('numbera').value);
    let b = parseFloat(document.getElementById('numberb').value);
    resultado = a + b
    printopresult.innerText = `${a} + ${b} = ${resultado}`
}
function sub() {
    let a = parseFloat(document.getElementById('numbera').value);
    let b = parseFloat(document.getElementById('numberb').value);
    resultado = a - b
    printopresult.innerText = `${a} - ${b} = ${resultado}`
}
function div() {
    let a = parseFloat(document.getElementById('numbera').value);
    let b = parseFloat(document.getElementById('numberb').value);
    let resultado1 = a / b;
    resultado = Math.round(resultado1);
    let resto = a % b;
    if (resto == 0) {
        printopresult.innerText = `${a} / ${b} = ${resultado}`
    }
    else {
        printopresult.innerText = `${a} / ${b} = ${resultado}, resto: ${resto}`
    }
}
function mult() {
    let a = parseFloat(document.getElementById('numbera').value);
    let b = parseFloat(document.getElementById('numberb').value);
    resultado = a * b
    printopresult.innerText = `${a} x ${b} = ${resultado}`
}
function log() {
    let a = parseFloat(document.getElementById('numbera').value);
    let b = parseFloat(document.getElementById('numberb').value);
    resultado = Math.log(b) / Math.log(a)
    printopresult.innerText = `${resultado}`
}