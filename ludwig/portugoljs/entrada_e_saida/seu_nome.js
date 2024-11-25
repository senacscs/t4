/* programa
{
	funcao inicio ()
	{
		cadeia nome

		escreva("Digite seu nome: ")
		leia(nome)
	}
}
*/
function nomeDigitado() {
    let nome
    nome = document.getElementById("nome").value
    console.log("O nome digitado foi: ", nome, "\n")
    alert("O nome digitado foi: ", nome, "\n")
    document.write("O nome digitado foi: ", nome, "\n")
    }