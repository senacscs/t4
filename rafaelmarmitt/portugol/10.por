
/* CLIQUE NO SINAL DE "+", � ESQUERDA, PARA EXIBIR A DESCRI��O DO EXEMPLO
 *  
 * Copyright (C) 2014 - UNIVALI - Universidade do Vale do Itaja�
 * 
 * Este arquivo de c�digo fonte � livre para utiliza��o, c�pia e/ou modifica��o
 * desde que este cabe�alho, contendo os direitos autorais e a descri��o do programa, 
 * seja mantido.
 * 
 * Se tiver dificuldade em compreender este exemplo, acesse as v�deoaulas do Portugol 
 * Studio para auxili�-lo:
 * 
 * https://www.youtube.com/watch?v=K02TnB3IGnQ&list=PLb9yvNDCid3jQAEbNoPHtPR0SWwmRSM-t
 * 
 * Descri��o:
 * 
 * 	Este exemplo define qual o valor da maior Idade penal usando uma constante.
 * 	Logo ap�s, pede ao usu�rio que informe sua idade e calcula quantos anos faltam
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
			escreva("Falta ", anos, " anos para voc� trocar de travesseiro\n")
		}
		senao 
		{
			escreva("voce tem que trocar de travesseiro.ps:se voce botou 2 anos ta na hora de trocar em\n")
		}
	}
}

