/* programa
{
	funcao inicio() 
	{
		inteiro metade_inteira, resto, valor
		
		escreva("Digite um valor: ") 
		leia(valor)

		metade_inteira = valor / 2 // Calcula a metade inteira do valor
		resto = valor % 3 // Calcula o resto da divisão do valor por 3
		
		escreva("\nA metade inteira do numero é: ", metade_inteira)
		escreva("\nO resto (mod) da divisão por 3 é: ", resto, "\n")
	}
}
*/
function calcular() {
	// Obter o valor digitado pelo usuário
	const valor = parseInt(document.getElementById("numero").value);

	// Calcular a metade inteira e o resto
	const metadeInteira = Math.floor(valor / 2);
	const resto = valor % 3;

	// Exibir os resultados
	document.getElementById("resultado").textContent = `A metade inteira do número é: ${metadeInteira}
O resto (mod) da divisão por 3 é: ${resto}`;
}




