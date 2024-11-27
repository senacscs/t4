/*programa
{
	funcao inicio()
	{
		caracter operador
		
		real resultado = 0.0, operando1, operando2

		escreva("Digite o primeiro número: ")
		leia(operando1)

		escreva("Digite o segundo número: ")
		leia(operando2)

		escreva("\n")
		
		escreva("Agora digite uma das operações ( + - * / ): ")
		leia(operador)

		/* Verifica qual foi a operação selecionada
		
		se (operador == '+')
		{
			resultado = operando1 + operando2
			
		}
		senao  se(operador == '-')
		{
			resultado = operando1 - operando2
			
		}
		senao se(operador == '/')
		{
			resultado = operando1 / operando2
			
		}
		senao se(operador == '*')
		{
			resultado = operando1 * operando2
		}	

		limpa()
		
		escreva("Resultado:\n\n")
		escreva(operando1, " ", operador, " ", operando2, " = ", resultado)
		
		escreva("\n")
	}
}
*/

function numeroDigitado() {
 
    let operando1 = parseFloat(document.getElementById("operando1").value);
    let operando2 = parseFloat(document.getElementById("operando2").value);
    let operador = document.getElementById("operador").value.trim(); 

   
    let resultado;

    
    if (operador === '+') {
        resultado = operando1 + operando2;
    } else if (operador === '-') {
        resultado = operando1 - operando2;
    } else if (operador === '/') {
        resultado = operando1 / operando2;
    } else if (operador === '*') {
        resultado = operando1 * operando2;
    } else {
        resultado = "Operador inválido!";
    }
    document.getElementById("resultado").innerHTML = `${operando1} ${operador} ${operando2} = ${resultado}`;
}
