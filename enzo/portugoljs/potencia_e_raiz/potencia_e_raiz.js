/* programa
{
	inclua biblioteca Matematica --> mat  // Inclui a biblioteca Matemática
	
	funcao inicio() 
	{
		real valor, potencia, raiz_quadrada
		
		escreva("Digite um valor: ") 
		leia(valor)

		potencia = mat.potencia(valor, 3.0)  	// Calcula o valor elevado ao cubo
		raiz_quadrada = mat.raiz (valor, 2.0) 	// Calcula a raiz quadrada do valor

		// Exibe os resultados
		
		escreva("\nO número ao cubo é: ", potencia, "\n")
		escreva("A raiz quadrada do número é: ", raiz_quadrada, "\n")
	}
}
*/

function numeroDigitado () {
	let numero = parseFloat(document.getElementById("number").value)
	let potencia, raiz_quadrada

	potencia = mat.potencia(number, 3.0)
}
