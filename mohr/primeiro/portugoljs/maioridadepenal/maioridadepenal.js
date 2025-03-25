document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("verificarBtn").addEventListener("click", verificarMaioridade);
});

function verificarMaioridade() {
    const MAIORIDADE = 18;

    // Obtém a idade do input
    let idade = parseInt(document.getElementById("idade").value);
    let anos = MAIORIDADE - idade;

    // Verifica se o valor da idade é válido
    if (isNaN(idade) || idade < 0) {
        document.getElementById("resultado").innerHTML = "Por favor, insira uma idade válida.";
        return;
    }

    // Determina o resultado
    let resultado = anos > 0 
        ? `Falta(m) ${anos} ano(s) para você atingir a maioridade.` 
        : "Você já atingiu a maioridade.";

    // Exibe o resultado na página
    document.getElementById("resultado").innerHTML = resultado;
}
