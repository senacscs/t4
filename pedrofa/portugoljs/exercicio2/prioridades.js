// /* programa
// {
// 	funcao inicio()
// 	{
// 		real resultado

// 		// Neste exemplo, a operação de multiplicação (*) será executada primeiro
// 		resultado = 5.0 + 4.0 * 2.0
// 		escreva("Operação: 5 + 4 * 2 = ", resultado) 


// 		// Neste exemplo, a operação de soma (+) será executada primeiro
// 		resultado = (5.0 + 4.0) * 2.0
// 		escreva("\nOperação: (5 + 4) * 2 = ", resultado)		

// 		/*
// 		 * Neste exemplo, a operação de divisão (/) será executada primeiro, 
// 		 * seguida pela operação de multiplicação (*). Por último, será 
// 		 * executada a operação de soma (+)
// 		 */
// 		resultado = 1.0 + 2.0 / 3.0 * 4.0 
// 		escreva("\nOperação: 1 + 2 / 3 * 4 = ", resultado)

// 		/*
// 		 * Neste exemplo, a operação de soma (+) será executada primeiro, 
// 		 * seguida pela operação de multiplicação (*). Por último, será 
// 		 * executada a operação de divisão (/).
// 		 */
// 		resultado = (1.0 + 2.0) / (3.0 * 4.0)
// 		escreva("\nOperação: (1 + 2) / (3 * 4) = ", resultado, "\n")
// 	}
// } 

let resultado;
 
        resultado = 5 + 4 * 2;
        document.getElementById("resultado").textContent += `Operação: 5 + 4 * 2 = ${resultado} <br>`;
 
        resultado = (5 + 4) * 2;
        document.getElementById("resultado").textContent += `Operação: (5 + 4) * 2 = ${resultado} <br>`;
 
        resultado = 1 + 2 / 3 * 4;
        document.getElementById("resultado").textContent += `Operação: 1 + 2 / 3 * 4 = ${resultado} <br>`;
 
        resultado = (1 + 2) / (3 * 4);
        document.getElementById("resultado").textContent += `Operação: (1 + 2) / (3 * 4) = ${resultado}`;