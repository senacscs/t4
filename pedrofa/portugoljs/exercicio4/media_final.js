/*
programa
{
	inclua biblioteca Matematica --> mat
	
	funcao inicio()
	{
		cadeia nome
		real nota1, nota2, nota3, media
		
		escreva("Digite seu nome: ")
		leia(nome)

		escreva("\n")
		
		escreva("Digite a primeira nota: ")
		leia(nota1)

		escreva("Digite a segunda nota: ")
		leia(nota2)

		escreva("Digite a terceira nota: ")
		leia(nota3)

		Calcula a média final do usuário 
		media = (nota1 + nota2 + nota3) / 3
		
		limpa()
		
		se (media >= 6)
		{
		 	escreva("Parabéns ", nome, "!\nVocê foi aprovado com a média ", mat.arredondar(media, 2))
		}
		senao
		{
			escreva("Que pena ", nome, "!\nVocê foi reprovado com a média ", mat.arredondar(media, 2))
		}

		escreva("\n")
	}
}
*/

function calcularMedia() {
    const nome = document.getElementById('nome').value.trim();
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const nota3 = parseFloat(document.getElementById('nota3').value);
    const resultado = document.getElementById('resultado');

    resultado.innerHTML = '';

    if (!nome || isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
        resultado.innerHTML = "Por favor, preencha todos os campos corretamente.";
        return;
    }

    const media = (nota1 + nota2 + nota3) / 3;
    const mediaArredondada = media.toFixed(2);

    if (media >= 6) {
        resultado.innerHTML = `Parabéns, ${nome}!<br>Você foi aprovado com a média ${mediaArredondada}.`;
    } else {
        resultado.innerHTML = `Que pena, ${nome}.<br>Você foi reprovado com a média ${mediaArredondada}.`;
    }
}

document.getElementById('btnCalcular').addEventListener('click', calcularMedia);
