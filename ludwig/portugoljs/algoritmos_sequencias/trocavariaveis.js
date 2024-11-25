/* programa
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

	
		 Realiza a troca dos valores contidos nas variáveis. É necessário utilizar 
		   a variável 'aux' para armazenar temporariamente o valor contido em 'a',
		  caso contrário este valor será perdido
		
		aux = a
		a = b
		b = aux

		escreva("\n")

		escreva("Variáveis após a troca: \n")
		escreva("A = ", a, "; B = ", b, "\n")
	}
}
*/

function numeroDigitado() {
	let a = parseFloat(document.getElementById("a").value);
	let b = parseFloat(document.getElementById("b").value);

	document.write("Variáveis antes da troca: A = " + a + "; B = " + b + "<br>");

	let aux = a;
	a = b;
	b = aux;

	document.write("Variáveis após a troca: A = " + a + "; B = " + b + "<br>");
}
