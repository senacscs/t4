/*
programa
{
	funcao inicio ()
	{
		cadeia nome

		escreva("Digite seu nome: ")
		leia(nome)
	}
}
*/

function seunome(){
    let nome;
    nome = document.getElementById("nome").value
    console.log("Olá ", nome, "\n");
    document.write("Olá ", nome);
}