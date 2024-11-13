// funcao inicio()
// 	{
// 		const inteiro MAIORIDADE = 18
		
// 		inteiro idade, anos
		
// 		escreva("Digite sua idade: ")
// 		leia(idade)

// 		// Calcula quantos anos faltam para atingir a maioridade
// 		anos = MAIORIDADE - idade 

// 		se (anos > 0)
// 		{
// 			escreva("Falta(m) ", anos, " ano(s) para você atingir a maioridade\n")
// 		}
// 		senao 
// 		{
// 			escreva("Você já atingiu a maioridade\n")
// 		}
// 	}

function matematica(){
    let MAIORIDADE = 18

    let idade, anos

    idade = document.getElementById("numero1").value

    anos = MAIORIDADE - idade

    if (anos > 0)
    {
        document.write("Falta(m) ", anos, " ano(s) para você atingir a maioridade\n")
    }

    else
    {
        document.write("Voce atingiu a maioridade")
    }

    
}