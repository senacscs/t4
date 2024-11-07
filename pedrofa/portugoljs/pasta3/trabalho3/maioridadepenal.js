/* programa 
{
	funcao inicio()
	{
		const inteiro MAIORIDADE = 18
		
		inteiro idade, anos
		
		escreva("Digite sua idade: ")
		leia(idade)

		// Calcula quantos anos faltam para atingir a maioridade
		anos = MAIORIDADE - idade 

		se (anos > 0)
		{
			escreva("Falta(m) ", anos, " ano(s) para você atingir a maioridade\n")
		}
		senao 
		{
			escreva("Você já atingiu a maioridade\n")
		}
	}
}
*/

function numeroDigitado() {
	const MAIORIDADE = 18;
	let idade = parseFloat(document.getElementById("idade").value);
	let anos = MAIORIDADE - idade

	if (anos > 0) {
		document.write("Falta(m) ", anos, " ano(s) para você atingir a maioridade.");
	} else {
		document.write("Você ja atingiu a maioridade.");
	}
}