function verificarIdade() {
    const idade = parseInt(document.getElementById('idadeInput').value, 10);
    const resultado = idade < 18 
        ? 'Você é menor de idade.' 
        : 'Você é maior de idade.';
    document.getElementById('resultadoMsg').innerText = resultado;
}