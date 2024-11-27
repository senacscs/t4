function calcular() {
    // Lê os valores dos inputs
    var a = parseFloat(document.getElementById("num1").value);
    var b = parseFloat(document.getElementById("num2").value);

    // Realiza os cálculos
    var soma = a + b; // Soma os dois valores
    var sub = a - b; // Subtrai os dois valores
    var mult = a * b; // Multiplica os dois valores
    var div = a / b; // Divide os dois valores
    var logBaseB = Math.log(a) / Math.log(b); // Logaritmo de a na base b

    // Atualiza os parágrafos com os resultados
    document.getElementById("soma").textContent = "A soma dos números é igual a: " + soma;
    document.getElementById("subtracao").textContent = "A subtração dos números é igual a: " + sub;
    document.getElementById("multiplicacao").textContent = "A multiplicação dos números é igual a: " + mult;
    document.getElementById("divisao").textContent = "A divisão dos números é igual a: " + div;
    document.getElementById("logaritmo").textContent = "O logaritmo de " + a + " na base " + b + " é: " + logBaseB;
}