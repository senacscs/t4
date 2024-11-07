function calcularDias() {
    // Solicita o ano atual
    let anoAtual = parseInt(prompt("Informe o ano atual: "));
    
    // Calcula a quantidade de anos bissextos até o ano atual
    let qtdAnosBi = Math.floor(anoAtual / 4);

    // Calcula o número total de dias desde 01/01/0001
    let dias = (anoAtual - 1) * 365 + qtdAnosBi;

    // Exibe o resultado na página
    let resultado = "Já se passaram " + dias + " dias desde 01/01/0001";
    document.getElementById("resultado").innerHTML = resultado;
}