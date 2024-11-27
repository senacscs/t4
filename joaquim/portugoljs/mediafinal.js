function calcularMedia() {
    const nome = document.getElementById("nome").value;
    const nota1 = parseFloat(document.getElementById("nota1").value);
    const nota2 = parseFloat(document.getElementById("nota2").value);
    const nota3 = parseFloat(document.getElementById("nota3").value);

    if (!nome.trim() || isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
        alert("Insira o nome e todas as notas corretamente.");
        return;
    }

    const media = (nota1 + nota2 + nota3) / 3;

    const mensagem = media >= 6 
        ? `Parabéns ${nome}!\nVocê foi aprovado com a média ${media.toFixed(2)}.` 
        : `Que pena ${nome}!\nVocê foi reprovado com a média ${media.toFixed(2)}.`;

    document.getElementById("resultado").innerText = mensagem;
}