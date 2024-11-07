function operacao1() {
    let resultado = 5.0 + 4.0 * 2.0;
    document.getElementById('resultadoMsg').innerText = `Operação: 5 + 4 * 2 = ${resultado}`;
}

function operacao2() {
    let resultado = (5.0 + 4.0) * 2.0;
    document.getElementById('resultadoMsg').innerText = `Operação: (5 + 4) * 2 = ${resultado}`;
}

function operacao3() {
    let resultado = 1.0 + 2.0 / 3.0 * 4.0;
    document.getElementById('resultadoMsg').innerText = `Operação: 1 + 2 / 3 * 4 = ${resultado}`;
}

function operacao4() {
    let resultado = (1.0 + 2.0) / (3.0 * 4.0);
    document.getElementById('resultadoMsg').innerText = `Operação: (1 + 2) / (3 * 4) = ${resultado}`;
}

function somarNumeros() {
    let numero1 = parseFloat(document.getElementById('num1').value);
    let numero2 = parseFloat(document.getElementById('num2').value);
    let resultado = numero1 + numero2;
    document.getElementById('resultadoMsg').innerText = `O valor de ${numero1} somado a ${numero2} é = ${resultado}`;
}

function subtrairNumeros() {
    let numero1 = parseFloat(document.getElementById('num1').value);
    let numero2 = parseFloat(document.getElementById('num2').value);
    let resultado = numero1 - numero2;
    document.getElementById('resultadoMsg').innerText = `O valor de ${numero1} subtraído de ${numero2} é = ${resultado}`;
}

function multiplicarNumeros() {
    let numero1 = parseFloat(document.getElementById('num1').value);
    let numero2 = parseFloat(document.getElementById('num2').value);
    let resultado = numero1 * numero2;
    document.getElementById('resultadoMsg').innerText = `O valor de ${numero1} multiplicado por ${numero2} é = ${resultado}`;
}

function dividirNumeros() {
    let numero1 = parseFloat(document.getElementById('num1').value);
    let numero2 = parseFloat(document.getElementById('num2').value);
    let resultado = numero1 / numero2;
    document.getElementById('resultadoMsg').innerText = `O valor de ${numero1} dividido por ${numero2} é = ${resultado}`;
}