document.getElementById("trocarBtn").addEventListener("click", function trocarNumeros() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);

    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById("resultadoMsg").textContent = "Por favor, insira números válidos em ambos os campos.";
        return;
    }

    const aux = num1;
    const novoNum1 = num2;
    const novoNum2 = aux;

    document.getElementById("resultadoMsg").textContent = `Valores trocados: Primeiro Número = ${novoNum1}, Segundo Número = ${novoNum2}.`;
});