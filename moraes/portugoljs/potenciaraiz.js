function calcularPotenciaRaiz() {
    // Obtém o valor digitado pelo usuário
    const valor = parseFloat(document.getElementById("inputValor").value);
    
    // Calcula o valor elevado ao cubo
    const potencia = Math.pow(valor, 3);
    
    // Calcula a raiz quadrada do valor
    const raizQuadrada = Math.sqrt(valor);

    // Exibe os resultados na página
    document.getElementById("resultadoPotencia").textContent = "O número ao cubo é: " + potencia.toFixed(2);
    document.getElementById("resultadoRaiz").textContent = "A raiz quadrada do número é: " + raizQuadrada.toFixed(2);
}
