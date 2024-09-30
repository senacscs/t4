programa 
{
	funcao inicio()
	{
		const inteiro MAIORIDADE = 18
		const inteiro ANO_ATUAL = 2024
		
		inteiro ano_nascimento, idade, anos
		
		escreva("Digite seu ano de nascimento: ")
		leia(ano_nascimento)

		// Calcula a idade
		idade = ANO_ATUAL - ano_nascimento

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
