// programa 
// {
// 	funcao inicio ()
// 	{	
// 		// Os preços dos produtos são definidos em constantes
		
// 		const real PRECO_PARAFUSO = 1.50
// 		const real PRECO_ARRUELA  = 2.00
// 		const real PRECO_PORCA    = 2.50

// 		cadeia nome
// 		inteiro quantidade_parafusos, quantidade_arruelas, quantidade_porcas 
// 		real total_parafusos, total_arruelas, total_porcas, total_pagar 

// 		escreva("Digite seu nome: ") 
// 		leia(nome) 
		
// 		escreva("\nDigite a quantidade de parafusos que deseja comprar: ") 
// 		leia(quantidade_parafusos)
		
// 		escreva("Digite a quantidade de arruelas que deseja comprar: ") 
// 		leia(quantidade_arruelas)

// 		escreva("Digite a quantidade de porcas que deseja comprar: ") 
// 		leia(quantidade_porcas)

// 		/*
// 		 * Cálculo dos valores a serem pagos. O cálculo é feito multiplicando
// 		 * a quantidade de itens vendidos pelo preço de cada item
// 		 */		
// 		total_parafusos = PRECO_PARAFUSO * quantidade_parafusos
// 		total_arruelas = PRECO_ARRUELA * quantidade_arruelas
// 		total_porcas = PRECO_PORCA * quantidade_porcas
		
// 		total_pagar = total_parafusos + total_porcas + total_arruelas 

// 		limpa()
		
// 		escreva("Cliente: ", nome, "\n")
// 		escreva("===============================\n")
// 		escreva("Parafusos: ", quantidade_parafusos, "\n")
// 		escreva("Arruelas: " , quantidade_arruelas, "\n")
// 		escreva("Porcas: ", quantidade_porcas, "\n")
// 		escreva("===============================\n")
// 		escreva("Total a pagar:  R$ ", total_pagar, "\n")
// 	} 
// }

function rpg() {
    let preco_parafuso = 1.50
    let preco_arruela = 2
    let preco_porca = 2.50

    let nome
    let quantidade_parafusos, quantidade_arruelas, quantidade_porcas
    let total_parafusos, total_arruelas, total_porcas, total_pagar

    nome = document.getElemntyById("nome").value;
    quantidade_parafusos = document.getElementyById("quantidade_parafusos").value;
    quantidade_arruelas = document.getElementyById("quantidade_arruelas").value;
    quantidade_porcas = document.getElemntyById("quantidade_porcas").value;
    
    total_parafusos = parafuso * quantidade_parafusos
    total_arruelas = arruela * quantidade_arruelas
    total_porcas = porca * quantidade_porcas

    total_pagar = total_parafusos + total_arruelas + total_porcas

    alert("Cliente: ", nome);
    document.write("Quantidade de parafusos: ", total_parafusos, '<br>');
    document.write("Quantidade de arruelas: ", total_arruelas, '<br>');
    document.write("Quantidade de porcas: ", total_porcas, '<br>');
    document.write("Total para pagar: ", total_pagar);
}