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

function matematica(){
    // 		cadeia matematica
     let a, b, soma, sub, mult, div;
    // 		real a, b, soma, sub, mult, div
        // 		leia(numero)
        a = parseInt(document.getElementById("numero").value)
        b = parseInt(document.getElementById("numero").value)
    
    
    
    
    
    // 		soma = a + b // Soma os dois valores
       soma = a + b
    // 		sub  = a - b // Subtrai os dois valores
       sub = a - b
    // 		mult = a * b // Multiplica os dois valores
       mult = a * b
    // 		div  = a / b // Divide os dois valores
       div = a / b
     
        
    // 		escreva("\nA soma dos números é igual a: ", soma) 		// Exibe o resultado da soma
    document.write("\nA soma dos números é igual a: ", soma)	
    // 		escreva("\nA subtração dos números é igual a: ", sub) 		// Exibe o resultado da subtração
    document.write("\nA subtração dos números é igual a: ", sub)	
    // 		escreva("\nA multiplicação dos números é igual a: ", mult) 	// Exibe o resultado da multiplicação
    document.write("\nA subtração dos números é igual a: ", mult)	
    // 		escreva("\nA divisão dos números é igual a: ", div, "\n") 	// Exibe o resultado da divisão
    document.write("\nA divisão dos números é igual a: ", div, "\n")	
    
    }
    
    
    