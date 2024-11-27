function escolherOpcao(opcao) {
    const resultado = document.getElementById('resultado');
    switch (opcao) {
        case 1:
            resultado.textContent = "Você é lindo(a)!";
            break;
        case 2:
            resultado.textContent = "Você é um monstro!";
            break;
        case 3:
            resultado.textContent = "Tchau!";
            break;
        default:
            resultado.textContent = "Opção Inválida!";
    }
}