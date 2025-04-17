function calcularMediaFinal() {
    const nome = document.getElementById('nomeUsuario').value;
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const nota3 = parseFloat(document.getElementById('nota3').value);
    const media = (nota1 + nota2 + nota3) / 3;
    const mensagem = media >= 6
        ? `Parabéns ${nome}! Você foi aprovado com a média ${media.toFixed(2)}.`
        : `Que pena ${nome}! Você foi reprovado com a média ${media.toFixed(2)}.`;
    document.getElementById('resultadoMsg').innerText = mensagem;
} 