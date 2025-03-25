function calcularDias() {
    // Obtém o ano digitado pelo usuário
    let anoAtual = parseInt(document.getElementById("anoAtual").value);

    // Verifica se o valor é válido
    if (isNaN(anoAtual) || anoAtual < 1) {
        document.getElementById("resultado").innerHTML = "Por favor, insira um ano válido.";
        return;
    }

    // Calcula a quantidade de anos bissextos até o ano atual
    let qtdAnosBi = Math.floor((anoAtual - 1) / 4);

    // Calcula o número total de dias desde 01/01/0001
    let dias = (anoAtual - 1) * 365 + qtdAnosBi;

    // Exibe o resultado na página
    document.getElementById("resultado").innerHTML =
        "Já se passaram " + dias + " dias desde 01/01/0001.";
}
