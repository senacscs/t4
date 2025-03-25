document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("calcularBtn").addEventListener("click", calcularPotenciaRaiz);
});

function calcularPotenciaRaiz() {
    // Obtém o valor do campo de entrada
    let valor = parseFloat(document.getElementById("valor").value);

    // Verifica se o valor é válido
    if (isNaN(valor)) {
        document.getElementById("resultado").innerHTML = "Por favor, insira um número válido.";
        return;
    }

    // Calcula o valor ao cubo e a raiz quadrada
    let potencia = Math.pow(valor, 3).toFixed(2);
    let raizQuadrada = Math.sqrt(valor).toFixed(2);

    // Exibe os resultados na página
    document.getElementById("resultado").innerHTML =
        `<p>O número ao cubo é: ${potencia}</p>
         <p>A raiz quadrada do número é: ${raizQuadrada}</p>`;
}
