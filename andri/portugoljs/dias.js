function calcularDias() {
    const anoAtual = parseInt(document.getElementById("anoAtual").value);
    let resultado = '';

    if (!isNaN(anoAtual) && anoAtual > 0) {
        const qtdAnosBi = Math.floor(anoAtual / 4);
        const dias = (anoAtual - 1) * 365 + qtdAnosBi;

        resultado = `Já se passaram ${dias} dias desde 01/01/0001`;
    } else {
        resultado = "Por favor, insira um ano válido (maior que 0).";
    }

    document.getElementById("result").innerHTML = resultado;
}