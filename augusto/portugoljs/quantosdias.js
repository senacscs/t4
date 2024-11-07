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
 * 	Este exemplo pede ao usuario que informe o ano atual. Logo após, calcula e
 * 	exibe a quantidade de dias que se passaram desde o dia 01/01/0001 (ano 1 dc)
 * 	até o dia 01/01 do ano atual.
 * 
 * Autores:
 * 
 * 	Giordana Maria da Costa Valle
 * 	Carlos Alexandre Krueger
 * 	
 * Data: 01/06/2013
 */
function calcularDias() {
  // Obter o ano informado pelo usuário
  const anoAtual = parseFloat(document.getElementById("ano").value);

  // Calcular a quantidade de anos bissextos
  const qtdAnosBissextos = Math.floor(anoAtual / 4);

  // Calcular o número total de dias
  const dias = (anoAtual - 1) * 365 + qtdAnosBissextos;

  // Exibir o resultado
  document.getElementById("resultado").textContent = `Já se passaram ${dias} dias desde 01/01/0001`;
}