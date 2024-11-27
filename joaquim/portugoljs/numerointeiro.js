function verificarNumero() {
    const numero = parseInt(document.getElementById("numero").value);

    if (isNaN(numero)) {
        alert("Por favor, insira um número inteiro válido.");
        return;
    }

    let mensagem;
    if (numero > 0) {
        mensagem = "O número é positivo.";
    } else if (numero < 0) {
        mensagem = "O número é negativo.";
    } else {
        mensagem = "O número é igual a zero.";
    }

    document.getElementById("resultado").innerText = mensagem;
}