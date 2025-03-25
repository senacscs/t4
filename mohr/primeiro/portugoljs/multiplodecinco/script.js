function verificarMultiplo(event) {
    event.preventDefault(); // Impede o recarregamento da página
    
    // Obtém o número digitado
    const numero = parseInt(document.getElementById('numero').value);

    let resultado = "";

    // Verifica se o número é múltiplo de 5
    if (numero % 5 === 0) {
        resultado = `O número ${numero} é múltiplo de 5`;
    } else {
        resultado = `O número ${numero} não é múltiplo de 5`;
    }

    // Exibe o resultado
    document.getElementById('resultado').innerText = resultado;
}
