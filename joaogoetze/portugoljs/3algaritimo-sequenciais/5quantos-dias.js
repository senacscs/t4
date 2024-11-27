// funcao inicio()
// 	{
// 		inteiro ano_atual, qtd_anos_bi, dias

// 		escreva("Informe o ano atual: ")
// 		leia(ano_atual)

// 		/*
// 		 *  Calcula a quantidade de anos bissextos que ocorreram até 
// 		 *  o ano atual (divisão inteira)
// 		 */ 
// 		qtd_anos_bi = ano_atual / 4 

// 		/* Calcula quantos dias serão no total */
// 		dias = (ano_atual - 1) * 365 +  qtd_anos_bi 
		
// 		escreva("Já se passaram ", dias, " dias desde 01/01/0001\n")
// 	}

function matematica(){

 let ano_atual, qtd_anos_bi, dias

 ano_atual = parseFloat(document.getElementById("numero").value);

 		qtd_anos_bi = ano_atual / 4

        dias = (ano_atual - 1) * 365 +  qtd_anos_bi 

        document.write("Já se passaram ", dias, " dias desde 01/01/0001\n")

}
