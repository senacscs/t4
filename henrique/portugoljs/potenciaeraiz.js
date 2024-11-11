function calcular() {
    const valor = parseFloat(document.getElementById("numeroInput").value);

    if (isNaN(valor)) {
        document.getElementById("resultado").textContent = "Por favor, digite um número válido.";
        return;
    }

    const potencia = Math.pow(valor, 3);  // Potência ao cubo
    const raizQuadrada = Math.sqrt(valor);  // Raiz quadrada

    // Exibe os resultados
    document.getElementById("resultado").textContent = `
        O número ao cubo é: ${potencia}
        A raiz quadrada do número é: ${raizQuadrada}
    `;
}
