function somarNumeros() {
    let numero1 = parseInt(document.getElementById('num1').value);
    let numero2 = parseInt(document.getElementById('num2').value);
    let resultado = numero1 + numero2;
    document.getElementById('resultadoMsg').innerText = `O valor de ${numero1} somado a ${numero2} é = ${resultado}`;
}

function subtrairNumeros() {
    const numero1 = parseInt(document.getElementById('num1').value);
    const numero2 = parseInt(document.getElementById('num2').value);
    const resultado = numero1 - numero2;
    document.getElementById('resultadoMsg').innerText = `O valor de ${numero1} subtraído de ${numero2} é = ${resultado}`;
}

function multiplicarNumeros() {
    const numero1 = parseInt(document.getElementById('num1').value);
    const numero2 = parseInt(document.getElementById('num2').value);
    const resultado = numero1 * numero2;
    document.getElementById('resultadoMsg').innerText = `O valor de ${numero1} multiplicado por ${numero2} é = ${resultado}`;
}

function dividirNumeros() {
    const numero1 = parseInt(document.getElementById('num1').value);
    const numero2 = parseInt(document.getElementById('num2').value);
    const resultado = numero1 / numero2;
    document.getElementById('resultadoMsg').innerText = `O valor de ${numero1} dividido por ${numero2} é = ${resultado}`;
}