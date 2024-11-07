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
    let a = parseInt(document.getElementById('valorA').value);
    let b = parseInt(document.getElementById('valorB').value);
    let aux;

    aux = a;
    a = b;
    b = aux;

    let resultado = "Variáveis após a troca: A = " + a + "; B = " + b;
    document.getElementById('resultado').innerText = resultado;
}
