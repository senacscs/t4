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
// function numeroDigitado() {
// let numero
// numero = document.getElementById("numero").value
// console.log("O número digitado foi: ", numero, "\n")
// alert("O número digitado foi: ", numero, "\n")
// document.write("O número digitado foi: ", numero, "\n")
// }

function inicio() {
	let numero;

	numero = parseInt(prompt("Digite um número inteiro: "));

	alert("O número digitado foi: " + numero);
}