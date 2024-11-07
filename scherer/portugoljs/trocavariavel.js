function trocarValores() {
    let a = parseInt(document.getElementById('valorA').value);
    let b = parseInt(document.getElementById('valorB').value);
    let aux;
    aux = a;
    a = b;
    b = aux;
    let resultado = "Variáveis após a troca: A = " + a + "; B = " + b;
    document.getElementById('resultado').innerText = resultado;
}