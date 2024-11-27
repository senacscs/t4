/*programa
{
	funcao inicio()
	{
		inteiro numero, multiplo
		
		escreva("Digite um número: ")
		leia(numero)

		/* 
		 *  Para verificar se um número é múltiplo de outro utiliza-se a operação
		 *  módulo, representada no Portugol pela operador %.
		 *  
		 *  Se o resultado da operação for 0, então um número é múltiplo do outro.
		 

		limpa()
		
		se (numero % 5 == 0) 
		{
			escreva("O número ", numero, " é multiplo de 5")	
		}
		senao
		{
			escreva("O número ", numero, " não é multiplo de 5")
		}

		escreva("\n")
	}
}*/

function verificarMultiplo() {
    const numero = parseInt(document.getElementById('numero').value);
    const resultado = document.getElementById('resultado');

    // Verifica se a entrada é válida
    if (isNaN(numero)) {
        resultado.innerHTML = "Por favor, insira um número válido.";
        return;
    }

    // Verifica se o número é múltiplo de 5
    if (numero % 5 === 0) {
        resultado.innerHTML = `O número ${numero} é múltiplo de 5.`;
    } else {
        resultado.innerHTML = `O número ${numero} não é múltiplo de 5.`;
    }
}

// Evento de clique no botão
document.getElementById('btnVerificar').addEventListener('click', verificarMultiplo);
