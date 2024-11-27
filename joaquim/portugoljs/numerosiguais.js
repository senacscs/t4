function sortearNumero() {
    const numDigitado = parseInt(document.getElementById("numDigitado").value);

    if (isNaN(numDigitado) || numDigitado < 0 || numDigitado > 6) {
        alert("Por favor, insira um número válido entre 0 e 6.");
        return;
    }

    const numSorteado = Math.floor(Math.random() * 7);

    const mensagem = numDigitado === numSorteado 
        ? "Os números são iguais!" 
        : "Os números são diferentes!";

    document.getElementById("resultado").innerText = mensagem;
    document.getElementById("detalhes").innerText = 
        `Número digitado: ${numDigitado}\nNúmero sorteado: ${numSorteado}`;
}