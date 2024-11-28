document.addEventListener("DOMContentLoaded", function () {
    document
        .getElementById("calcularPotenciaRaizBtn")
        .addEventListener("click", calcularPotenciaRaiz);
});

function calcularPotenciaRaiz() {
    let valor = parseFloat(document.getElementById("numeroPotenciaRaiz").value);

    if (isNaN(valor)) {
        document.getElementById("resultadoMsg").innerHTML = "Por gentileza, insira um número válido para realizar os cálculos.";
        return;
    }

    let potencia = Math.pow(valor, 3).toFixed(2);

    let raizQuadrada;
    if (valor >= 0) {
        raizQuadrada = Math.sqrt(valor).toFixed(2);
    } else {
        raizQuadrada = "Não é possível calcular a raiz quadrada de um número negativo (resultado em números complexos).";
    }

    let resultadoHtml = `
        <p>O número elevado ao cubo é: <strong>${potencia}</strong></p>
        <p>A raiz quadrada do número é: <strong>${raizQuadrada}</strong></p>
    `;

    document.getElementById("resultadoMsg").innerHTML = resultadoHtml;
}
