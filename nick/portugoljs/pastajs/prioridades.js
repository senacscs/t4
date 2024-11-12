function mostrarResultados() {
    let resultado = "";

    // Operação: 5 + 4 * 2
    let operacao1 = 5.0 + 4.0 * 2.0;
    resultado += `<p>Operação: 5 + 4 * 2 = ${operacao1}</p>`;

    // Operação: (5 + 4) * 2
    let operacao2 = (5.0 + 4.0) * 2.0;
    resultado += `<p>Operação: (5 + 4) * 2 = ${operacao2}</p>`;

    // Operação: 1 + 2 / 3 * 4
    let operacao3 = 1.0 + 2.0 / 3.0 * 4.0;
    resultado += `<p>Operação: 1 + 2 / 3 * 4 = ${operacao3}</p>`;

    // Operação: (1 + 2) / (3 * 4)
    let operacao4 = (1.0 + 2.0) / (3.0 * 4.0);
    resultado += `<p>Operação: (1 + 2) / (3 * 4) = ${operacao4}</p>`;

    // Exibe os resultados na div de resultado
    document.getElementById("resultado").innerHTML = resultado;
  }