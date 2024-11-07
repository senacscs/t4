function calcular() {
    const valor = parseFloat(document.getElementById('numeroInput').value);
    
    if (isNaN(valor)) {
        document.getElementById('resultadoMsg').innerText = "Por favor, insira um número válido.";
        return;
    }

    const potencia = Math.pow(valor, 3);
    
    const raizQuadrada = Math.sqrt(valor);
    
    document.getElementById('resultadoMsg').innerText = 
        `O número ${valor} elevado ao cubo é: ${potencia}\n` +
        `A raiz quadrada do número ${valor} é: ${raizQuadrada}`;
}
