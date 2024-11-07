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



function calcular() {
    const valor = parseFloat(document.getElementById("numero").value);


    const potencia = Math.pow(valor, 3);
    const raizQuadrada = Math.sqrt(valor);

    document.getElementById("resultado").textContent = `
        O número ao cubo é: ${potencia}
        A raiz quadrada do número é: ${raizQuadrada}
    `;
}
