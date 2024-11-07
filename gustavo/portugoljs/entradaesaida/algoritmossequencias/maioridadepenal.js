function verificarMaioridade() {
    // Obter a idade digitada
    var idade = document.getElementById("idade").value;
    var resultado = document.getElementById("resultado");

    // Definir a constante para maioridade
    const MAIORIDADE = 18;

    // Verificar se a idade foi preenchida corretamente
    if (idade === "") {
        resultado.textContent = "Por favor, insira sua idade.";
        return;
    }

    // Calcular os anos faltando para atingir a maioridade
    var anosFaltando = MAIORIDADE - idade;

    // Exibir o resultado com base na idade inserida
    if (anosFaltando > 0) {
        resultado.textContent = "Falta(m) " + anosFaltando + " ano(s) para você atingir a maioridade.";
    } else {
        resultado.textContent = "Você já atingiu a maioridade.";
    }
}
