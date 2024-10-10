// programa
// {
// 	inclua biblioteca Matematica --> mat  // Inclui a biblioteca Matemática
	
// 	funcao inicio() 
// 	{
// 		real valor, potencia, raiz_quadrada
		
// 		escreva("Digite um valor: ") 
// 		leia(valor)

// 		potencia = mat.potencia(valor, 3.0)  	// Calcula o valor elevado ao cubo
// 		raiz_quadrada = mat.raiz (valor, 2.0) 	// Calcula a raiz quadrada do valor

// 		// Exibe os resultados
		
// 		escreva("\nO número ao cubo é: ", potencia, "\n")
// 		escreva("A raiz quadrada do número é: ", raiz_quadrada, "\n")
// 	}
// }

function conta(){
    let valor0 = document.getElementById('valor0').value;
    let raiz = Math.sqrt(valor0);
    let pot = valor0 * valor0;
    document.getElementById('res').innerText = `A raiz quadrada de ${valor0} é ${raiz} "\n" E seu valor elevado a 2 é ${pot}`
}
