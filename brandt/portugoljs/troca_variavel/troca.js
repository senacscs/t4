// programa
// {
// 	funcao inicio() 
// 	{
// 		inteiro a, b, aux

// 		escreva("Informe um valor para a variável A: ")
// 		leia(a)

// 		escreva("Informe um valor para a variável B: ")
// 		leia(b)

// 		limpa()

// 		escreva("Variáveis antes da troca: \n")
// 		escreva("A = ", a, "; B = ", b, "\n")
		
// 		aux = a
// 		a = b
// 		b = aux

// 		escreva("\n")

// 		escreva("Variáveis após a troca: \n")
// 		escreva("A = ", a, "; B = ", b, "\n")
// 	}
// }


function trocarValores() {
    let a = parseInt(document.getElementById("valorA").value);
    let b = parseInt(document.getElementById("valorB").value);
    let resultado = '';

    if (!isNaN(a) && !isNaN(b)) {
        resultado += `Variáveis antes da troca: <br> A = ${a}; B = ${b} <br><br>`;

        // Realiza a troca
        let aux = a;
        a = b;
        b = aux;

        resultado += `Variáveis após a troca: <br> A = ${a}; B = ${b}`;
    } else {
        resultado = "Por favor, insira valores válidos para A e B.";
    }

    document.getElementById("result").innerHTML = resultado;
}