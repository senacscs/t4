function verificarMultiplo() {
    const numero = parseInt(document.getElementById("numero").value);

    if (isNaN(numero)) {
        alert("Por favor, insira um número válido.");
        return;
    }

    const resultado = numero % 5 === 0 
        ? `O número ${numero} é múltiplo de 5.` 
        : `O número ${numero} não é múltiplo de 5.`;

    document.getElementById("resultado").innerText = resultado;
}