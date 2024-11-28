function verificarMultiploCinco() {
    const numero = parseInt(document.getElementById('numeroMultiplo').value);
    const mensagem = numero % 5 === 0 
        ? `O número ${numero} é múltiplo de 5.` 
        : `O número ${numero} não é múltiplo de 5.`;
    document.getElementById('resultadoMsg').innerText = mensagem;
}