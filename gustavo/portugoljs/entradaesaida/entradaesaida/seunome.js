function mostrarNome() {
    const nome = document.getElementById('nome').value;
    const resultado = document.getElementById('resultado');
    resultado.textContent = `Olá, ${nome}!`;
}
