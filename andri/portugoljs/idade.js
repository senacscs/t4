document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("verificarBtn").addEventListener("click", verificarMaioridade);
});

function verificarMaioridade() {
    const MAIORIDADE = 18;

    
    let idade = parseInt(document.getElementById("idade").value);
    let anos = MAIORIDADE - idade;

  
    if (isNaN(idade) || idade < 0) {
        document.getElementById("resultado").innerHTML = "Por favor, insira uma idade válida.";
        return;
    }

    
    let resultado = anos > 0 
        ? `Falta(m) ${anos} ano(s) para você atingir a maioridade.` 
        : "Você já atingiu a maioridade.";

   
    document.getElementById("resultado").innerHTML = resultado;
}