/*
programa
{
	funcao inicio()
	{
		inteiro numero
		
		escreva("Digite um número inteiro: ")
		leia(numero)

		se(numero > 0) // Verifica se o número é positivo
		{ 
			escreva("O número é positivo")
		}
		senao se(numero < 0) // Verifica se o número é negativo
		{ 
			escreva("O número é negativo")
		}
		senao // Se não é positivo nem negativo, só pode ser igual a zero 
		{
			escreva("O número é igual zero")
		}

		escreva("\n")		
	}
}
*/

function verificarNumero() {
    const numero = parseInt(document.getElementById('numero').value);
    const resultado = document.getElementById('resultado');

    // Verifica se a entrada é válida
    if (isNaN(numero)) {
        resultado.innerHTML = "Por favor, insira um número válido.";
        return;
    }

    // Verifica se o número é positivo, negativo ou zero
    if (numero > 0) {
        resultado.innerHTML = "O número é positivo.";
    } else if (numero < 0) {
        resultado.innerHTML = "O número é negativo.";
    } else {
        resultado.innerHTML = "O número é igual a zero.";
    }
}

// Evento de clique no botão
document.getElementById('btnVerificar').addEventListener('click', verificarNumero);
