function mostrarNome() {
    const nome = document.getElementById("nome").value;
    document.getElementById("resultado").textContent = `Olá, ${nome}!`;
}