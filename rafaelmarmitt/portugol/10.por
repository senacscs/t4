
/* CLIQUE NO SINAL DE "+", À ESQUERDA, PARA EXIBIR A DESCRIÇÃO DO EXEMPLO
 *  
 * Copyright (C) 2014 - UNIVALI - Universidade do Vale do Itajaí
 * 
 * Este arquivo de código fonte é livre para utilização, cópia e/ou modificação
 * desde que este cabeçalho, contendo os direitos autorais e a descrição do programa, 
 * seja mantido.
 * 
 * Se tiver dificuldade em compreender este exemplo, acesse as vídeoaulas do Portugol 
 * Studio para auxiliá-lo:
 * 
 * https://www.youtube.com/watch?v=K02TnB3IGnQ&list=PLb9yvNDCid3jQAEbNoPHtPR0SWwmRSM-t
 * 
 * Descrição:
 * 
 * 	Este exemplo define qual o valor da maior Idade penal usando uma constante.
 * 	Logo após, pede ao usuário que informe sua idade e calcula quantos anos faltam
 * 	para ele atingir a maioridade.
 * 
 * Autores:
 * 
 * 	Giordana Maria da Costa Valle
 * 	Carlos Alexandre Krueger
 * 	
 * Data: 01/06/2013
 */

programa 
{
	funcao inicio()
	{
		const inteiro TRAVESSEIRO = 2
		
		inteiro idade, tempo, anos
		
		escreva("Digite o tempo que voce tem seu travesseiro:  ")
		leia(tempo)

		// Calcula quantos anos tem o travesseiro
		anos = TRAVESSEIRO - tempo
		
		se (anos < 2)
		{
			escreva("Falta ", anos, " anos para você trocar de travesseiro\n")
		}
		senao 
		{
			escreva("voce tem que trocar de travesseiro.ps:se voce botou 2 anos ta na hora de trocar em\n")
		}
	}
}

