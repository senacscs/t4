function calcularDias() {
    // Captura o ano atual informado pelo usuário
    const anoAtual = parseInt(document.getElementById("anoAtual").value) || 0;

    // Calcula a quantidade de anos bissextos que ocorreram até o ano atual
    const qtdAnosBi = Math.floor(anoAtual / 4);

    // Calcula o total de dias
    const dias = (anoAtual - 1) * 365 + qtdAnosBi;

    // Exibe o resultado
    document.getElementById("resultado").innerHTML = `
      <p>Já se passaram <strong>${dias}</strong> dias desde 01/01/0001</p>
    `;
  }