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
	// Obter o valor digitado pelo usuário
	const numero = parseInt(document.getElementById("numero").value);

	// Exibir o resultado
	document.getElementById("resultado").textContent = `O número digitado foi: ${numero}`;
}