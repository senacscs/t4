function verificarLetra() {
    let letra = document.getElementById("letra").value;
    let mensagem = "";

    if (
        letra === 'A' || letra === 'E' || letra === 'I' || letra === 'O' || letra === 'U' ||
        letra === 'a' || letra === 'e' || letra === 'i' || letra === 'o' || letra === 'u'
    ) {
        mensagem = "A letra '" + letra + "' é uma vogal";
    } else {
        mensagem = "A letra '" + letra + "' é uma consoante";
    }

    document.getElementById("resultado").innerText = mensagem;
}