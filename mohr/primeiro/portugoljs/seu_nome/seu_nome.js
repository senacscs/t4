function inicio() {
    // Solicita ao usuário para digitar o nome
    let nome = prompt("Digite seu nome:");

    // Exibe o nome digitado na página
    document.getElementById('top').innerText = `O nome digitado foi: ${nome}`;
}
