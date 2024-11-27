/*
programa 
{
	funcao inicio()
	{
		inteiro lado_a, lado_b, lado_c
		
		escreva ("Informe o primeiro lado do triângulo: ")
		leia (lado_a)

		escreva ("Informe o segundo lado do triângulo: ")
		leia (lado_b)

		escreva ("Informe o terceiro lado do triângulo: ")
		leia (lado_c)

		se (lado_a == lado_b e lado_a == lado_c)
		{
			// Se os três lados forem iguais é equilatero
			
			escreva ("\nEste triângulo é Equilátero\n")
		}
		senao 
		{
			// Se chegou aqui é porque os três lados não são iguais
			// Basta ver se dois deles são iguais para saber se é isóceles
			
			se (lado_a == lado_b ou lado_b == lado_c ou lado_c == lado_a)
			{
				escreva ("\nEste triângulo é Isósceles\n")
			}
			senao
			{
				escreva ("\nEste triângulo é Escaleno\n")
			}
		}
	}
}
*/

function verificarTriangulo() {
    const ladoA = parseFloat(document.getElementById('ladoA').value);
    const ladoB = parseFloat(document.getElementById('ladoB').value);
    const ladoC = parseFloat(document.getElementById('ladoC').value);
    const resultado = document.getElementById('resultado');

    // Classifica o triângulo sem validações adicionais
    if (ladoA === ladoB && ladoB === ladoC) {
        resultado.innerHTML = "Este triângulo é Equilátero.";
    } else if (ladoA === ladoB || ladoB === ladoC || ladoC === ladoA) {
        resultado.innerHTML = "Este triângulo é Isósceles.";
    } else {
        resultado.innerHTML = "Este triângulo é Escaleno.";
    }
}

// Evento de clique no botão
document.getElementById('btnVerificar').addEventListener('click', verificarTriangulo);

