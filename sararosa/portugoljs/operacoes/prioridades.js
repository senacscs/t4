/*
 
programa
{
	funcao inicio()
	{
		real resultado

		// Neste exemplo, a operação de multiplicação (*) será executada primeiro
		resultado = 5.0 + 4.0 * 2.0
		escreva("Operação: 5 + 4 * 2 = ", resultado) 


		// Neste exemplo, a operação de soma (+) será executada primeiro
		resultado = (5.0 + 4.0) * 2.0
		escreva("\nOperação: (5 + 4) * 2 = ", resultado)		

		resultado = 1.0 + 2.0 / 3.0 * 4.0 
		escreva("\nOperação: 1 + 2 / 3 * 4 = ", resultado)


		resultado = (1.0 + 2.0) / (3.0 * 4.0)
		escreva("\nOperação: (1 + 2) / (3 * 4) = ", resultado, "\n")
	}
}
*/
function inicio() {
    let resultado;

    resultado = 5.0 + 4.0 * 2.0;
    document.write("Operação: 5 + 4 * 2 = " + resultado + "\n"); 

    resultado = (5.0 + 4.0) * 2.0;
    document.write("\nOperação: (5 + 4) * 2 = " + resultado + "\n");

    resultado = 1.0 + 2.0 / 3.0 * 4.0;
    document.write("\nOperação: 1 + 2 / 3 * 4 = " + resultado + "\n");

    resultado = (1.0 + 2.0) / (3.0 * 4.0);
    document.write("\nOperação: (1 + 2) / (3 * 4) = " + resultado + "\n");
}