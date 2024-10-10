// programa
// {
// 	funcao inicio()
// 	{
// 		real a, b, soma, sub, mult, div
		
// 		escreva("Digite o primeiro número: ")
// 		leia(a)

// 		escreva("Digite o segundo número: ")
// 		leia(b)

// 		soma = a + b // Soma os dois valores
// 		sub  = a - b // Subtrai os dois valores
// 		mult = a * b // Multiplica os dois valores
// 		div  = a / b // Divide os dois valores

// 		escreva("\nA soma dos números é igual a: ", soma) 		// Exibe o resultado da soma
// 		escreva("\nA subtração dos números é igual a: ", sub) 		// Exibe o resultado da subtração
// 		escreva("\nA multiplicação dos números é igual a: ", mult) 	// Exibe o resultado da multiplicação
// 		escreva("\nA divisão dos números é igual a: ", div, "\n") 	// Exibe o resultado da divisão
// 	}
// }

function multi(){
    const fator1 = document.getElementById('valor1').value;
    const fator2 = document.getElementById('valor2').value;
    const resultado = fator1 * fator2;
    document.getElementById('res').innerText = `O valor de ${fator1} multiplicado por ${fator2} é = ${resultado}`
  }
  function dividir(){
    const fator1 = document.getElementById('valor1').value;
    const fator2 = document.getElementById('valor2').value;
    const resultado = fator1 / fator2;
    document.getElementById('res').innerText = `O valor de ${fator1} dividido por ${fator2} é = ${resultado}`
    
  }
  function subtrair(){
    const fator1 = document.getElementById('valor1').value;
    const fator2 = document.getElementById('valor2').value;
    const resultado = fator1 - fator2;
    document.getElementById('res').innerText = `O valor de ${fator1} menos ${fator2} é = ${resultado}`
  }
  function somar(){
    let fator1 = parseInt(document.getElementById('valor1').value);
    let fator2 = parseInt(document.getElementById('valor2').value);
    let resultado = fator1 + fator2;
    document.getElementById('res').innerText = `O valor de ${fator1} mais ${fator2} é = ${resultado}`
  }
