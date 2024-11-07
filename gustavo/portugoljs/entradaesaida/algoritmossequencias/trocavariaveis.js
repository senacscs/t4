function trocarValores() {
    // Captura os valores dos campos de entrada
    let a = parseInt(document.getElementById('valorA').value);
    let b = parseInt(document.getElementById('valorB').value);

    // Verifica se os valores são válidos
    if (isNaN(a) || isNaN(b)) {
        alert('Por favor, insira valores válidos para A e B.');
        return;
    }

    // Exibe os valores antes da troca
    let resultadoAntes = `
        <h3>Variáveis antes da troca:</h3>
        <p>A = ${a}; B = ${b}</p>
    `;

    // Realiza a troca utilizando a variável auxiliar
    let aux = a;
    a = b;
    b = aux;

    // Exibe os valores após a troca
    let resultadoDepois = `
        <h3>Variáveis após a troca:</h3>
        <p>A = ${a}; B = ${b}</p>
    `;

    // Exibe o resultado completo
    document.getElementById('resultado').innerHTML = resultadoAntes + resultadoDepois;

    // Limpa os campos de entrada após a troca
    document.getElementById('valorA').value = '';
    document.getElementById('valorB').value = '';
}