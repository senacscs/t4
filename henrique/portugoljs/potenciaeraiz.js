function calcular() {
    // Recupera o valor digitado no input
    const valor = parseFloat(document.getElementById('numeroInput').value);
    
    // Verifica se o valor é válido
    if (isNaN(valor)) {
        document.getElementById('resultadoMsg').innerText = "Por favor, insira um número válido.";
        return;
    }

    // Calcula o valor elevado ao cubo
    const potencia = Math.pow(valor, 3);
    
    // Calcula a raiz quadrada do valor
    const raizQuadrada = Math.sqrt(valor);
    
    // Exibe os resultados
    document.getElementById('resultadoMsg').innerText = 
        `O número ${valor} elevado ao cubo é: ${potencia}\n` +
        `A raiz quadrada do número ${valor} é: ${raizQuadrada}`;
}
