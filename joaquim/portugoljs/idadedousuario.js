function verificarIdade() {
    const idade = parseInt(document.getElementById("idade").value);

    if (isNaN(idade) || idade < 0) {
        alert("Por favor, insira uma idade válida.");
        return;
    }

    const resultado = idade < 18 
        ? "Você é menor de idade." 
        : "Você é maior de idade.";

    document.getElementById("resultado").innerText = resultado;
}