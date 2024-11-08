function inicio() {
    // Obtém o valor do input
    let valor = parseFloat(document.getElementById("valor").value);
    let potencia, raizQuadrada;

    // Calcula o valor elevado ao cubo e a raiz quadrada
    potencia = Math.pow(valor, 3); // Calcula o valor elevado ao cubo
    raizQuadrada = Math.sqrt(valor); // Calcula a raiz quadrada do valor

    // Exibe os resultados
    document.getElementById("resultadoPotencia").innerText = "O número ao cubo é: " + potencia;
    document.getElementById("resultadoRaiz").innerText = "A raiz quadrada do número é: " + raizQuadrada;
}
