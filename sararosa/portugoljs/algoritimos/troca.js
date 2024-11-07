/*programa
{
	funcao inicio() 
	{
		inteiro a, b, aux

		escreva("Informe um valor para a variável A: ")
		leia(a)

		escreva("Informe um valor para a variável B: ")
		leia(b)

		limpa()

		escreva("Variáveis antes da troca: \n")
		escreva("A = ", a, "; B = ", b, "\n")

		
		aux = a
		a = b
		b = aux

		escreva("\n")

		escreva("Variáveis após a troca: \n")
		escreva("A = ", a, "; B = ", b, "\n")
	}
}
 */
function trocarValores() {
	// Declaração das variáveis
	let a, b, aux;
  
	// Entrada de dados pelo usuário
	a = parseInt(prompt("Informe um valor para a variável A: "));
	b = parseInt(prompt("Informe um valor para a variável B: "));
  
	// Exibição dos valores antes da troca
	console.log("Variáveis antes da troca:\nA =", a, "; B =", b);
  
	// Troca dos valores
	aux = a;
	a = b;
	b = aux;
  
	// Exibição dos valores após a troca
	console.log("\nVariáveis após a troca:\nA =", a, "; B =", b);
  }
  
  // Chamada da função para executar o código
  trocarValores();
