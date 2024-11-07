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

function inicio() {
    let resultadosDiv = document.getElementById('resultados'); // Pega o div para mostrar os resultados

    // Exibe a operação onde a multiplicação é executada primeiro
    resultadosDiv.innerHTML += "Operação: 5 + 4 * 2<br>";

    // Exibe a operação onde a soma é executada primeiro
    resultadosDiv.innerHTML += "Operação: (5 + 4) * 2<br>";

    // Exibe a operação onde a divisão e multiplicação são feitas antes da soma
    resultadosDiv.innerHTML += "Operação: 1 + 2 / 3 * 4<br>";

    // Exibe a operação onde a soma é feita antes da multiplicação e depois a divisão
    resultadosDiv.innerHTML += "Operação: (1 + 2) / (3 * 4)<br>";
}