/*programa
{ 
	funcao inicio ()
	{ 	
		inteiro menor, idade
		
		escreva("Informe sua idade: ")
		leia(idade)
	
		se (idade < 18) 
		{
			escreva("Você é menor de idade")
		} 
		senao
		{
			escreva("Você é maior de idade")
		}

		escreva("\n")
	} 
}*/

function numeroDigitado() {
    const MAIORIDADE = 18;
    let idade = parseFloat(document.getElementById("idade").value);


    if (idade >= MAIORIDADE) {
        document.write("Você tem ", idade, " ano(s), então já atingiu a maioridade.");
    } else {
        document.write("Você é menor de idade.");
    }
}
