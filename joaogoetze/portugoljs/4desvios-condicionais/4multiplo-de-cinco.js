// funcao inicio()
// 	{
// 		inteiro numero, multiplo
		
// 		escreva("Digite um número: ")
// 		leia(numero)

// 		/* 
// 		 *  Para verificar se um número é múltiplo de outro utiliza-se a operação
// 		 *  módulo, representada no Portugol pela operador %.
// 		 *  
// 		 *  Se o resultado da operação for 0, então um número é múltiplo do outro.
// 		 */

// 		limpa()
		
// 		se (numero % 5 == 0) 
// 		{
// 			escreva("O número ", numero, " é multiplo de 5")	
// 		}
// 		senao
// 		{
// 			escreva("O número ", numero, " não é multiplo de 5")
// 		}

// 		escreva("\n")
// 	}


function cinco() {

    let numero, multiplo

    numero = document.getElementById("se").value

    	if (numero % 5 == 0) 
		{
			document.write("O número ", numero, " é multiplo de 5")	
		}
		else
		{
			document.write("O número ", numero, " não é multiplo de 5")
		}
}