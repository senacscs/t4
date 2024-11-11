// programa 
// {
// 	funcao inicio()
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
// }

function inicio() {
    const MAIORIDADE = 18;

    let idade;
    let anos;

    idade = parseInt(prompt("Digite sua idade: "));

    // Calcula quantos anos faltam para atingir a maioridade
    anos = MAIORIDADE - idade;

    if (anos > 0) {
        alert("Falta(m) ${anos} ano(s) para você atingir a maioridade");
    } else {
        alert("Você já atingiu a maioridade");
    }
}

