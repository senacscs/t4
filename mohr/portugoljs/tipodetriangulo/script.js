// Função para verificar o tipo do triângulo
function verificarTriangulo(event) {
    event.preventDefault(); // Impede o recarregamento da página

    // Obtendo os valores dos lados do triângulo
    const lado_a = parseFloat(document.getElementById('lado_a').value);
    const lado_b = parseFloat(document.getElementById('lado_b').value);
    const lado_c = parseFloat(document.getElementById('lado_c').value);

    let resultadoHTML = '';

    // Verificando se o triângulo é equilátero
    if (lado_a === lado_b && lado_a === lado_c) {
        resultadoHTML = "\nEste triângulo é Equilátero";
    } else if (lado_a === lado_b || lado_b === lado_c || lado_c === lado_a) {
        // Verificando se o triângulo é isósceles
        resultadoHTML = "\nEste triângulo é Isósceles";
    } else {
        // Caso contrário, o triângulo é escaleno
        resultadoHTML = "\nEste triângulo é Escaleno";
    }

    // Exibindo o resultado na página
    document.getElementById('resultado').innerHTML = resultadoHTML;
}