document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("calcularBtn").addEventListener("click", calcularOperacoes);
});

function calcularOperacoes() {
    // Obtém os valores dos campos de entrada
    let a = parseFloat(document.getElementById("numero1").value);
    let b = parseFloat(document.getElementById("numero2").value);

    // Verifica se os valores são válidos
    if (isNaN(a) || isNaN(b)) {
        document.getElementById("resultado").innerHTML = "Por favor, insira dois números válidos.";
        return;
    }

    // Realiza as operações matemáticas
    let soma = a + b;
    let sub = a - b;
    let mult = a * b;
    let div = b !== 0 ? (a / b).toFixed(2) : "Infinito (divisão por zero)";
    let log = Math.log(b) / Math.log(a) 

    // Exibe os resultados na página
    document.getElementById("resultado").innerHTML =
        `<p>A soma dos números é: ${soma}</p>
         <p>A subtração dos números é: ${sub}</p>
         <p>A multiplicação dos números é: ${mult}</p>
         <p>A divisão dos números é: ${div}</p>
         <p>O log de ${b} na base ${a} é ${log} </p>
         `;
}
