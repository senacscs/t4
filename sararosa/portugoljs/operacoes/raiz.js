/*
programa
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
function inicio() {
    let valor, potencia, raiz_quadrada;

    valor = parseFloat(prompt("Digite um valor:"));

    potencia = Math.pow(valor, 3); 
    raiz_quadrada = Math.sqrt(valor); 

    console.log("\nO número ao cubo é: " + potencia);
    console.log("A raiz quadrada do número é: " + raiz_quadrada + "\n");
    document.write("\nO número ao cubo é: " + potencia + "<br>");
    document.write("A raiz quadrada do número é: " + raiz_quadrada + "<br>");
}