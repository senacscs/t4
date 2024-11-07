
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
 * 	Este exemplo pede o nome do usuário e três valores inteiros, os quais 
 * 	representam a quantidade de porcas, parafusos e arruelas compradas. 
 * 	Após, exibe o nome do usuário seguido da quantidade de cada item comprado
 * 	e o valor total a ser pago.
 * 
 * Autores:
 * 
 * 	Giordana Maria da Costa Valle
 * 	Carlos Alexandre Krueger
 * 	
 * Data: 01/06/2013
 */
function calcularTotal() {
  // Preços unitários
  const PRECO_PARAFUSO = 1.50;
  const PRECO_ARRUELA = 2.00;
  const PRECO_PORCA = 2.50;

  // Obtendo os valores dos campos
  const nome = document.getElementById("nome").value;
  const quantidadeParafusos = parseInt(document.getElementById("parafusos").value);
  const quantidadeArruelas = parseInt(document.getElementById("arruelas").value);
  const quantidadePorcas = parseInt(document.getElementById("porcas").value);

  // Calculando os valores totais
  const totalParafusos = PRECO_PARAFUSO * quantidadeParafusos;
  const totalArruelas = PRECO_ARRUELA * quantidadeArruelas;
  const totalPorcas = PRECO_PORCA * quantidadePorcas;
  const totalPagar = totalParafusos + totalArruelas + totalPorcas;

  // Exibindo o resultado
  document.getElementById("resultado").innerHTML = `
    <h2>Resumo da Compra</h2>
    <p>Cliente: ${nome}</p>
    <p>Parafusos: ${quantidadeParafusos} - R$ ${totalParafusos.toFixed(2)}</p>
    <p>Arruelas: ${quantidadeArruelas} - R$ ${totalArruelas.toFixed(2)}</p>
    <p>Porcas: ${quantidadePorcas} - R$ ${totalPorcas.toFixed(2)}</p>
    <p><b>Total a pagar: R$ ${totalPagar.toFixed(2)}</b></p>
  `; 
}