document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("mostrarBtn").addEventListener("click", mostrarNumero);
});

function mostrarNumero() {
    // Obtém o valor do campo de entrada
    let numero = parseInt(document.getElementById("numero").value);

    // Verifica se o valor é um número válido
    if (isNaN(numero)) {
        document.getElementById("resultado").innerHTML = "Por favor, insira um número válido.";
    } else {
        document.getElementById("resultado").innerHTML = "O número digitado foi: " + numero;
    }
}
