function calcular() {
    // Lê os valores dos inputs
    var a= parseFloat(document.getElementById("num1").value);
    var b = parseFloat(document.getElementById("num2").value);

    // Realiza os cálculos
    var soma = a + b // Soma os dois valores;
    var sub = a - b // Subtrai os dois valores;
    var mult = a * b // Multiplica os dois valores;
    var div = a / b // Divide os dois valores;

    // Usando document.write para exibir os resultados diretamente no corpo da página
    document.write("<h2>Resultados:</h2>");
    document.write("A soma dos números é igual a: ", soma) 		// Exibe o resultado da soma"<br>");
    document.write("A subtração dos números é igual a: ", sub) 		// Exibe o resultado da subtração"<br>");
    document.write("A multiplicação dos números é igual a: ", mult) 	// Exibe o resultado da multiplicação"  "<br>");
    document.write("A divisão dos números é igual a: ", div, "\n") 	// Exibe o resultado da divisão"  "<br>");
}
