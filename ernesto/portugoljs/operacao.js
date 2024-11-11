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
function calcular() {
    let a = parseFloat(document.getElementById('num1').value);
    let b = parseFloat(document.getElementById('num2').value);

    let soma = a + b;
    let sub = a - b;
    let mult = a * b;
    let div = a / b;

    document.getElementById('resultado').innerHTML = `
        <p>A soma dos números é igual a: ${soma}</p>
        <p>A subtração dos números é igual a: ${sub}</p>
        <p>A multiplicação dos números é igual a: ${mult}</p>
        <p>A divisão dos números é igual a: ${div}</p>
    `;
}