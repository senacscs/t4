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

function inicio() {
	let metade_inteira, resto, valor;

	valor = parseInt(prompt("Digite um valor: "));

	metade_inteira = Math.floor(valor / 2); // Calcula a metade inteira do valor
	resto = valor % 3; // Calcula o resto da divisão do valor por 3

	alert("A metade inteira do número é: " + metade_inteira + "\nO resto (mod) da divisão por 3 é: " + resto);
}





