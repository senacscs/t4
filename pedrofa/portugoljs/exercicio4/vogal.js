/*programa  
{
	funcao inicio ()
	{ 	
		caracter letra
		
		escreva("Digite uma letra: ")
		leia(letra)

		// O Portugol diferencia caracteres minúsculos e maiúsculos, 
		// portanto é preciso verificar ambos os casos
		
		se 
		(
			letra == 'A' ou letra == 'E' ou letra == 'I' ou letra == 'O' ou letra == 'U' ou
			letra == 'a' ou letra == 'e' ou letra == 'i' ou letra == 'o' ou letra == 'u'			
		)
		{ 
			escreva("\nA letra '", letra, "' é uma vogal\n") 
		}
		senao
		{
			escreva("\nA letra '", letra, "' é uma consoante\n") 
		}		
	} 
}*/

function textoDigitado() {
    let letra = document.getElementById("texto").value;

    // Verifica se a letra é uma vogal
    if (
        letra === 'A' || letra === 'E' || letra === 'I' || letra === 'O' || letra === 'U' ||
        letra === 'a' || letra === 'e' || letra === 'i' || letra === 'o' || letra === 'u'
    ) { 
        document.getElementById("resultado").innerHTML = `A letra '${letra}' é uma vogal`;
    } else {
        document.getElementById("resultado").innerHTML = `A letra '${letra}' é uma consoante`;
    }       
}
