function processarOpcao(event) {
    event.preventDefault(); // Impede o recarregamento da página

    // Obter a opção selecionada pelo usuário
    const opcao = parseInt(document.getElementById('opcao').value);

    let resultadoHTML = "";

    switch (opcao) {
        case 1:
            resultadoHTML = "Você é lindo(a)!";
            break;
        case 2:
            resultadoHTML = "Você é um monstro!";
            break;
        case 3:
            resultadoHTML = "Tchau!";
            break;
        default:
            resultadoHTML = "Opção Inválida!";
            break;
    }

    // Exibindo o resultado na página
    document.getElementById('resultado').innerHTML = resultadoHTML;
}