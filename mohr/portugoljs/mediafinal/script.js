function arredondar(valor, casasDecimais) {
    const fator = Math.pow(10, casasDecimais);
    return Math.round(valor * fator) / fator;
}

// Função para calcular a média e mostrar a mensagem
function calcularMedia(event) {
    event.preventDefault(); // Impede o recarregamento da página

    const nome = document.getElementById('nome').value;
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const nota3 = parseFloat(document.getElementById('nota3').value);

    // Calculando a média
    const media = (nota1 + nota2 + nota3) / 3;
    const mediaArredondada = arredondar(media, 2);

    // Exibindo a mensagem
    let resultadoHTML = '';

    if (media >= 6) {
        resultadoHTML = `Parabéns ${nome}!<br>Você foi aprovado com a média ${mediaArredondada}`;
    } else {
        resultadoHTML = `Que pena ${nome}!<br>Você foi reprovado com a média ${mediaArredondada}`;
    }

    document.getElementById('resultado').innerHTML = resultadoHTML;
}