function inicio() {
    let nome;

    // Solicita ao usuário para digitar o nome
    nome = prompt("Digite seu nome: ");
    document.getElementById('top').innerText = `O nome digitado foi: ${nome}` 
}