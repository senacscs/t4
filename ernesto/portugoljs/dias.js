function Calcular() {
    const anoAtual = parseInt(document.getElementById("Ano").value);

    const qtdAnosBissextos = Math.floor(anoAtual / 4) - Math.floor(anoAtual / 100) + Math.floor(anoAtual / 400);

    const dias = (anoAtual - 1) * 365 + qtdAnosBissextos;

    document.getElementById("Resultado").textContent = `Já se passaram ${dias} dias desde 01/01/0001`;
  }
