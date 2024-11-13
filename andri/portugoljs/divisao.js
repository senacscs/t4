document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("calcularBtn").addEventListener("click", inicio);
});

function inicio() {
    let metade_inteira, resto, valor;

    // Obtém o valor do input
    valor = parseInt(document.getElementById("valor").value);

    // Verifica se a entrada é válida
    if (isNaN(valor)) {
        document.getElementById("resultado").innerHTML = "Por favor, insira um valor válido.";
        return;
    }

    // Calcula a metade inteira e o resto
    metade_inteira = Math.floor(valor / 2); // Calcula a metade inteira do valor
    resto = valor % 3; // Calcula o resto da divisão do valor por 3

    // Exibe o resultado na página
    document.getElementById("resultado").innerHTML = 
        "A metade inteira do número é: " + metade_inteira + "<br>O resto (mod) da divisão por 3 é: " + resto;
}