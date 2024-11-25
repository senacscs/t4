/* programa
{
    funcao inicio()
    {
        real a, b, soma, sub, mult, div
    	
        escreva("Digite o primeiro número: ")
        leia(a)

        escreva("Digite o segundo número: ")
        leia(b)

        soma = a + b // Soma os dois valores
        sub  = a - b // Subtrai os dois valores
        mult = a * b // Multiplica os dois valores
        div  = a / b // Divide os dois valores

        escreva("\nA soma dos números é igual a: ", soma) 		// Exibe o resultado da soma
        escreva("\nA subtração dos números é igual a: ", sub) 		// Exibe o resultado da subtração
        escreva("\nA multiplicação dos números é igual a: ", mult) 	// Exibe o resultado da multiplicação
        escreva("\nA divisão dos números é igual a: ", div, "\n") 	// Exibe o resultado da divisão
    }
}
*/
function numeroDigitado() {
    let a = parseFloat(document.getElementById("number1").value);
    let b = parseFloat(document.getElementById("number2").value);

    let soma, sub, mult, div, logA, logB;

    soma = a + b;
    sub = a - b;
    mult = a * b;
    div = a / b;


    logA = Math.log10(a);
    logB = Math.log10(b);

    document.write("O resultado da soma é: ", soma, "<br>");
    document.write("O resultado da subtração é: ", sub, "<br>");
    document.write("O resultado da multiplicação é: ", mult, "<br>");
    document.write("O resultado da divisão é: ", div, "<br>");
    document.write("O logaritmo de A (base 10) é: ", logA, "<br>");
    document.write("O logaritmo de B (base 10) é: ", logB, "<br>");
}

