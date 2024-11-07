/* programa 
{
	funcao inicio ()
	{	
		// Os preços dos produtos são definidos em constantes
		
		const real PRECO_PARAFUSO = 1.50
		const real PRECO_ARRUELA  = 2.00
		const real PRECO_PORCA    = 2.50

		cadeia nome
		inteiro quantidade_parafusos, quantidade_arruelas, quantidade_porcas 
		real total_parafusos, total_arruelas, total_porcas, total_pagar 

		escreva("Digite seu nome: ") 
		leia(nome) 
		
		escreva("\nDigite a quantidade de parafusos que deseja comprar: ") 
		leia(quantidade_parafusos)
		
		escreva("Digite a quantidade de arruelas que deseja comprar: ") 
		leia(quantidade_arruelas)

		escreva("Digite a quantidade de porcas que deseja comprar: ") 
		leia(quantidade_porcas)

		
		 * Cálculo dos valores a serem pagos. O cálculo é feito multiplicando
		 * a quantidade de itens vendidos pelo preço de cada item
         		
		total_parafusos = PRECO_PARAFUSO * quantidade_parafusos
		total_arruelas = PRECO_ARRUELA * quantidade_arruelas
		total_porcas = PRECO_PORCA * quantidade_porcas
		
		total_pagar = total_parafusos + total_porcas + total_arruelas 

		limpa()
		
		escreva("Cliente: ", nome, "\n")
		escreva("===============================\n")
		escreva("Parafusos: ", quantidade_parafusos, "\n")
		escreva("Arruelas: " , quantidade_arruelas, "\n")
		escreva("Porcas: ", quantidade_porcas, "\n")
		escreva("===============================\n")
		escreva("Total a pagar:  R$ ", total_pagar, "\n")
	} 
}
*/

function calcularTotal() {
	const PRECO_PARAFUSO = 1.50;
	const PRECO_ARRUELA = 2.00;
	const PRECO_PORCA = 2.50;
	let nome = document.getElementById("nome").value;
	let quantidade_parafusos = parseInt(document.getElementById("quantidade_parafusos").value);
    let quantidade_arruelas = parseInt(document.getElementById("quantidade_arruelas").value);
    let quantidade_porcas = parseInt(document.getElementById("quantidade_porcas").value);

	let total_parafusos = PRECO_PARAFUSO * quantidade_parafusos;
    let total_arruelas = PRECO_ARRUELA * quantidade_arruelas;
    let total_porcas = PRECO_PORCA * quantidade_porcas;

    // Calcula o total a pagar
    let total_pagar = total_parafusos + total_arruelas + total_porcas;

	document.write("Cliente: ",nome, )
	document.write("Parafusos: ", quantidade_parafusos,)
	document.write("Arruelas: " , quantidade_arruelas,)
	document.write("Porcas: ", quantidade_porcas,)
	document.write("Total a pagar: R$ ", total_pagar,)
}