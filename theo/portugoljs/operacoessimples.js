/*programa
{
	funcao inicio()
	{
		real a, b, soma, sub, mult, div
		
		escreva("Digite o primeiro número: ")
		leia(a)

		escreva("Digite o segundo número: ")
		leia(b)

		soma = a + b // Soma os dois valores
		sub  = a - b // Subtrai os dois valores
		mult = a * b // Multiplica os dois valores
		div  = a / b // Divide os dois valores

		escreva("\nA soma dos números é igual a: ", soma) 		// Exibe o resultado da soma
		escreva("\nA subtração dos números é igual a: ", sub) 		// Exibe o resultado da subtração
		escreva("\nA multiplicação dos números é igual a: ", mult) 	// Exibe o resultado da multiplicação
		escreva("\nA divisão dos números é igual a: ", div, "\n") 	// Exibe o resultado da divisão
	}
}
*/

function getBaseLog(x, y) {
	return Math.log(y) / Math.log(x);
  }
  
  console.log(getBaseLog(2, 8));
  
  console.log(getBaseLog(5, 625));
  
  function operacoesSimples() {
	let a, b, soma, sub, mult, div, log;
	a = parseInt(document.getElementById("a").value);
	b = parseInt(document.getElementById("b").value);
  
	soma = a + b;
	sub = a - b;
	mult = a * b;
	div = a / b;
	log = getBaseLog(a, b);
  
	document.write("A soma dos números é igual a: ", soma);
	document.write("<br>A subtração dos números é igual a: ", sub);
	document.write("<br>A multiplicação dos números é igual a: ", mult);
	document.write("<br>A divisão dos números é igual a: ", div);
	document.write("<br>O log de base " + a + " do número " + b + " é igual a: ", log);
  }
  