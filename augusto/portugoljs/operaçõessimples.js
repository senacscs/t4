function calcular() {
   
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);   



    const soma = num1 + num2;
    const subtracao = num1 - num2;
    const multiplicacao = num1 * num2;
    const divisao = num1 / num2;

    document.getElementById("resultado").textContent = `
        A soma dos números é igual a: ${soma}
        A subtração dos números é igual a: ${subtracao}
        A multiplicação dos números é igual a: ${multiplicacao}
        A divisão dos números é igual a: ${divisao}
    `;
}