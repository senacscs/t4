

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
 * 	Este exemplo pede ao usuário a altura de 3 pessoas. Logo após,
 * 	calcula e exibe a media das alturas informadas.
 * 
 * Autores:
 * 
 * 	Giordana Maria da Costa Valle
 * 	Carlos Alexandre Krueger
 * 	
 * Data: 01/06/2013
 */


function calcularMedia() {
	
	const altura1 = parseFloat(document.getElementById("altura1").value);
	const altura2 = parseFloat(document.getElementById("altura2").value);
	const altura3 = parseFloat(document.getElementById("altura3").value);

	const media = (altura1 + altura2 + altura3) / 3;

	const mediaArredondada = media.toFixed(2);

	document.getElementById("resultado").textContent = `A média das alturas é: ${mediaArredondada} metros`;
  }
