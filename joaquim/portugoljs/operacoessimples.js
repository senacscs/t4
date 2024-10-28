// programa
// {
// 	funcao inicio()
// 	{
// 		real a, b, soma, sub, mult, div

// 		escreva("Digite o primeiro número: ")
// 		leia(a)

// 		escreva("Digite o segundo número: ")
// 		leia(b)

// 		soma = a + b // Soma os dois valores
// 		sub  = a - b // Subtrai os dois valores
// 		mult = a * b // Multiplica os dois valores
// 		div  = a / b // Divide os dois valores

// 		escreva("\nA soma dos números é igual a: ", soma) 		// Exibe o resultado da soma
// 		escreva("\nA subtração dos números é igual a: ", sub) 		// Exibe o resultado da subtração
// 		escreva("\nA multiplicação dos números é igual a: ", mult) 	// Exibe o resultado da multiplicação
// 		escreva("\nA divisão dos números é igual a: ", div, "\n") 	// Exibe o resultado da divisão
// 	}
// }

function operacoes() {

    let a, b, soma, sub, mult, div

    a = parseInt(document.getElementById("a").value)
    b = parseInt(document.getElementById("b").value)

    soma = a + b
    sub = a - b
    mult = a * b
    div = a / b

    document.write("A soma dos números é igual a: ", soma, "\n")
    document.write("A subtração dos números é igual a: ", sub, "\n")
    document.write("A multiplicação dos números é igual a: ", mult, "\n")
    document.write("A divisão dos números é igual a: ", div, "\n")
}