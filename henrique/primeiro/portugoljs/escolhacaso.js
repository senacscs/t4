function escolhaCaso() {
    const opcao = parseInt(document.getElementById("opcaoEscolha").value);

    let mensagem;

    switch (opcao) {
        case 1:
            mensagem = "Você é lindo(a)!";
            break;
        case 2:
            mensagem = "Você é um monstro!";
            break;
        case 3:
            mensagem = "Tchau!";
            break;
        default:
            mensagem = "Opção inválida!";
    }

    document.getElementById("resultadoMsg").innerText = mensagem;
}
