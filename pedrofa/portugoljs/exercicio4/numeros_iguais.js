/*programa
{
	inclua biblioteca Util --> util
	
	funcao inicio()
	{
		inteiro num_digitado, num_sorteado

		escreva("Informe um número de 0 a 6: ")
		leia(num_digitado)

		num_sorteado = util.sorteia(0, 6)

		se (num_digitado >= 0 e num_digitado <= 6)
		{
			se (num_digitado == num_sorteado) // verifica se o valor sorteado é igual ao valor digitado pelo usuário 
			{
				escreva("Os números são iguais!")
			}
			senao
			{
				escreva("Os números são diferentes!")
			}

			escreva("\n\nNúmero digitado: ", num_digitado)
			escreva("\nNúmero sorteado: ",  num_sorteado, "\n")
		}
		senao 
		{
			escreva("O número digitado deve estar entre 0 e 6\n")
		}
	}
}*/

function verificarNumero() {
    const numDigitado = parseInt(document.getElementById('numero').value);
    const resultado = document.getElementById('resultado');

    // Verifica se o número digitado está entre 0 e 6
    if (numDigitado >= 0 && numDigitado <= 6) {
        // Sorteia um número aleatório entre 0 e 6
        const numSorteado = Math.floor(Math.random() * 7); // Math.random() retorna entre 0 e 1, então multiplicamos por 7

        // Compara o número digitado com o sorteado
        if (numDigitado === numSorteado) {
            resultado.innerHTML = `Os números são iguais!<br><br> Número digitado: ${numDigitado}<br> Número sorteado: ${numSorteado}`;
        } else {
            resultado.innerHTML = `Os números são diferentes!<br><br> Número digitado: ${numDigitado}<br> Número sorteado: ${numSorteado}`;
        }
    } else {
        resultado.innerHTML = "O número digitado deve estar entre 0 e 6.";
    }
}

// Evento de clique no botão
document.getElementById('btnVerificar').addEventListener('click', verificarNumero);
