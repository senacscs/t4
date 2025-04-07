document.getElementById("idadeInput").addEventListener("change", function mostrarIdade() {
    const MAIORIDADE = 18;
    const idade = parseInt(document.getElementById("idadeInput").value);

    if (isNaN(idade)) {
        document.getElementById("resultadoMsg").textContent = "Por favor, insira uma idade válida.";
        return;
    }

    const anosRestantes = MAIORIDADE - idade;

    if (anosRestantes > 0) {
        document.getElementById("resultadoMsg").textContent = `Faltam ${anosRestantes} ano(s) para atingir a maioridade.`;
    } else {
        document.getElementById("resultadoMsg").textContent = "Você já atingiu a maioridade.";
    }
});