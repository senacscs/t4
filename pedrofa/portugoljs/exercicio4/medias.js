/*programa
{
	inclua biblioteca Matematica --> mat
	
	funcao inicio ()
	{
		real m1, m2, m3, media

		escreva ("Informe a média 1: " )
		leia (m1)
		escreva( "Informe a média 2: ")
		leia (m2)
		escreva ("Informe a média 3: ")
		leia (m3)

		media = (m1 + m2 + m3) / 3 

		limpa()
		escreva ("A média final é: ", mat.arredondar(media, 2), "\n\n")


		se (m1 < media)
		{ 
			escreva ("A média 1 é menor que a média final\n") 
		}
		
		se (m2 < media) 
		{
			escreva ("A média 2 é menor que a média final\n")
		}
		
		se (m3 < media)
		{
			escreva ("A média 3 é menor que a média final\n")
		}		
	}
}*/

function calcularMedia() {
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const nota3 = parseFloat(document.getElementById('nota3').value);
    const resultado = document.getElementById('resultado');

    // Calcula a média
    const media = ((nota1 + nota2 + nota3) / 3).toFixed(2);

    // Exibe a média final
    let mensagem = `A média final é: ${media}<br>`;

    // Verifica quais notas são menores que a média
    if (nota1 < media) {
        mensagem += `A nota 1 (${nota1}) é menor que a média final.<br>`;
    }
    if (nota2 < media) {
        mensagem += `A nota 2 (${nota2}) é menor que a média final.<br>`;
    }
    if (nota3 < media) {
        mensagem += `A nota 3 (${nota3}) é menor que a média final.<br>`;
    }

    resultado.innerHTML = mensagem;
}

// Evento de clique no botão
document.getElementById('btnCalcular').addEventListener('click', calcularMedia);
