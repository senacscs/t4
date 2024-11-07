function calcularDias() {
    const anoAtual = parseFloat(document.getElementById("ano").value);
    const qtdAnosBissextos = Math.floor(anoAtual / 4);
    const dias = (anoAtual - 1) * 365 + qtdAnosBissextos;
    document.getElementById("resultado").textContent = `Já se passaram ${dias} dias desde 01/01/0001`;
  }