function verificarNumerosIguais() {
    const numeroUsuario = parseInt(document.getElementById('numeroUsuario').value);
    const numeroSorteado = Math.floor(Math.random() * 7);
    const mensagem = numeroUsuario === numeroSorteado 
        ? `Os números são iguais! (${numeroUsuario})`
        : `Os números são diferentes! Número digitado: ${numeroUsuario}, Número sorteado: ${numeroSorteado}.`;
    document.getElementById('resultadoMsg').innerText = mensagem;
}