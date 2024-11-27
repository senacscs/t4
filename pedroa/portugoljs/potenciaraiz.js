function calcularValores() {
    let valor = parseFloat(document.getElementById("valor").value);
    let potencia = Math.pow(valor, 3);
    let raizQuadrada = Math.sqrt(valor);

    document.getElementById("resultado").innerText = 
        "O número ao cubo é: " + potencia + 
        "\nA raiz quadrada do número é: " + raizQuadrada;
}