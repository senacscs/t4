document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("calcularBtn").addEventListener("click", calcularPotenciaRaiz);
});

function calcularPotenciaRaiz() {

    let valor = parseFloat(document.getElementById("valor").value);


    if (isNaN(valor)) {
        document.getElementById("resultado").innerHTML = "Por favor, insira um número válido.";
        return;
    }


    let potencia = Math.pow(valor, 3).toFixed(2);
    let raizQuadrada = Math.sqrt(valor).toFixed(2);

    document.getElementById("resultado").innerHTML =
        `<p>O número ao cubo é: ${potencia}</p>
         <p>A raiz quadrada do número é: ${raizQuadrada}</p>`;
}