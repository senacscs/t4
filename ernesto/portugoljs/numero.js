/*programa 
{ 
	funcao inicio () 
	{ 
		inteiro numero
		
		escreva("Digite um número inteiro: ")
		leia(numero)
		
		escreva("O número digitado foi: ", numero, "\n")
	} 
} */

	function numeroDigitado() {
		//inteiro numero//
		let numero = document.getElementById("numero").value;

		console.log("O número digitado foi: ", numero);
		alert("O número digitado foi: ", numero);
		document.write("O número digitado foi: ", numero);
	}
