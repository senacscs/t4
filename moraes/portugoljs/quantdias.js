function calcularDias() {
    let anoAtual = parseInt(document.getElementById("anoAtual").value);
    let qtdAnosBi = Math.floor(anoAtual / 4);
    let dias = (anoAtual - 1) * 365 + qtdAnosBi;

    // Exibe o resultado
    document.getElementById("resultado").innerHTML = `
        Já se passaram ${dias} dias desde 01/01/0001 até o início do ano ${anoAtual}.
    `;
}
