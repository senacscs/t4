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

function verificar(){
    let maioridade = 18
    let idade = document.getElementById('idade').value;
    let anos = maioridade - idade;

    if(anos > 0)
        {
        document.getElementById('res').innerText = `falta(m) ${anos} para atingir a maioridade`
    }
    else
    {
        document.getElementById('res').innerText = `você ja atingiu a maioridade`
    }
}