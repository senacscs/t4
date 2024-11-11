function calcularDias() {
    // Obter o ano informado pelo usuário
    const anoAtual = parseFloat(document.getElementById("ano").value);
   
    // Calcular a quantidade de anos bissextos
    const qtdAnosBissextos = Math.floor(anoAtual / 4);
   
    // Calcular o número total de dias
    const dias = (anoAtual - 1) * 365 + qtdAnosBissextos;
   
    // Exibir o resultado
    document.getElementById("resultado").textContent = `Já se passaram ${dias} dias desde 01/01/0001`;
  }
 