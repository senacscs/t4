/* programa 
{ 
	funcao inicio () 
	{ 
		inteiro numero
		
		escreva("Digite um número inteiro: ")
		leia(numero)
		
		escreva("O número digitado foi: ", numero, "\n")
	} 
}
*/
function exibirNumero() {

	const numero = parseInt(document.getElementById("numero").value);

	document.getElementById("resultado").textContent = `O número digitado foi: ${numero}`;
}