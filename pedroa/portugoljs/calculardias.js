function calcularDias() {
    let anoAtual = parseInt(document.getElementById("anoAtual").value) || 0;
    let qtdAnosBi = Math.floor(anoAtual / 4);
    let dias = (anoAtual - 1) * 365 + qtdAnosBi;

    document.getElementById("resultado").innerHTML = `
        <p>Já se passaram ${dias} dias desde 01/01/0001</p>
    `;
}
