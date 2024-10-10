function inicio() {
    // Neste exemplo, a operação de multiplicação (*) será executada primeiro
    resultado = 5.0 + 4.0 * 2.0
		escreva("Operação: 5 + 4 * 2 = ", resultado) 

    // Neste exemplo, a operação de soma (+) será executada primeiro
    resultado = (5.0 + 4.0) * 2.0
		escreva("\nOperação: (5 + 4) * 2 = ", resultado)

    /*
		 * Neste exemplo, a operação de divisão (/) será executada primeiro, 
		 * seguida pela operação de multiplicação (*). Por último, será 
		 * executada a operação de soma (+)
		 */
    resultado = 1.0 + 2.0 / 3.0 * 4.0 
		escreva("\nOperação: 1 + 2 / 3 * 4 = ", resultado)
        /*
        * Neste exemplo, a operação de soma (+) será executada primeiro, 
        * seguida pela operação de multiplicação (*). Por último, será 
        * executada a operação de divisão (/).
        */
       resultado = (1.0 + 2.0) / (3.0 * 4.0)
       escreva("\nOperação: (1 + 2) / (3 * 4) = ", resultado, "\n")
    // Exibe os resultados no HTML
    document.getElementById("soma").textContent = "A soma dos números é igual a: " + soma;
    document.getElementById("subtracao").textContent = "A subtração dos números é igual a: " + sub;
    document.getElementById("multiplicacao").textContent = "A multiplicação dos números é igual a: " + mult;
    document.getElementById("divisao").textContent = "A divisão dos números é igual a: " + div;
}
