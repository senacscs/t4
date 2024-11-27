function verificarIdade() {
    let idade = parseInt(document.getElementById("idade").value);
    let mensagem;

    if (idade < 18) {
        mensagem = "Você é menor de idade";
    } else {
        mensagem = "Você é maior de idade";
    }

    document.getElementById("resultado").innerText = mensagem;
}