function verificarMaioridade() {
    const MAIORIDADE = 18;

    // Solicita a idade do usuário
    let idade = parseInt(prompt("Digite sua idade: "));
    let anos = MAIORIDADE - idade;

    let resultado;

    // Verifica se faltam anos para atingir a maioridade
    if (anos > 0) {
        resultado = "Falta(m) " + anos + " ano(s) para você atingir a maioridade.";
    } else {
        resultado = "Você já atingiu a maioridade.";
    }

    // Exibe o resultado na página
    document.getElementById("resultado").innerHTML = resultado;
}