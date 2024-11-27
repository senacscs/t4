function executarOpcao() {
    const opcao = parseInt(document.getElementById("opcao").value);

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    switch (opcao) {
        case 1:
            resultado.innerText = "Você é lindo(a)!";
            break;
        case 2:
            resultado.innerText = "Você é um monstro!";
            break;
        case 3:
            resultado.innerText = "Tchau!";
            break;
        default:
            resultado.innerText = "Opção Inválida!";
    }
}