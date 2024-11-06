function calcularMaioridade() {
    const MAIORIDADE = 18; // Define a constante para a maioridade
    let idade = parseInt(document.getElementById("idade").value);
    let anos = MAIORIDADE - idade;

    // Verifica e exibe quantos anos faltam ou se já atingiu a maioridade
    if (anos > 0) {
        document.getElementById("resultado").textContent = `Falta(m) ${anos} ano(s) para você atingir a maioridade.`;
    } else {
        document.getElementById("resultado").textContent = "Você já atingiu a maioridade.";
    }
}
