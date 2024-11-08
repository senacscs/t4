function inicio() {
    // Obtém o ano atual do input
    const anoAtual = parseInt(document.getElementById("anoAtual").value) || 0;
    let qtdAnosBi, dias;

    // Calcula a quantidade de anos bissextos até o ano atual
    qtdAnosBi = Math.floor(anoAtual / 4); // Divisão inteira

    // Calcula o total de dias
    dias = (anoAtual - 1) * 365 + qtdAnosBi;

    // Exibe o resultado
    const resultado = `Já se passaram ${dias} dias desde 01/01/0001`;
    document.getElementById("resultado").innerText = resultado;
}
