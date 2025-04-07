function mostrarNome() {
    const nome = document.getElementById('nomeInput').value;
    document.getElementById('resultadoMsg').innerText = `Seu nome é: ${nome}`;
}