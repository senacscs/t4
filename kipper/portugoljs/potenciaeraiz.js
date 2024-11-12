function calcular() {
    const valor = parseFloat(document.getElementById("numero").value);


    const potencia = Math.pow(valor, 3);
    const raizQuadrada = Math.sqrt(valor);

    document.getElementById("resultado").textContent = `
        O número ao cubo é: ${potencia}
        A raiz quadrada do número é: ${raizQuadrada}
    `;
}