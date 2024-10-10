// programa
// {
// 	funcao inicio() 
// 	{
// 		inteiro a, b, aux

// 		escreva("Informe um valor para a variável A: ")
// 		leia(a)

// 		escreva("Informe um valor para a variável B: ")
// 		leia(b)

// 		limpa()

// 		escreva("Variáveis antes da troca: \n")
// 		escreva("A = ", a, "; B = ", b, "\n")

// 		/* 
// 		 *  Realiza a troca dos valores contidos nas variáveis. É necessário utilizar 
// 		 *  a variável 'aux' para armazenar temporariamente o valor contido em 'a',
// 		 *  caso contrário este valor será perdido
// 		 */
		
// 		aux = a
// 		a = b
// 		b = aux

// 		escreva("\n")

// 		escreva("Variáveis após a troca: \n")
// 		escreva("A = ", a, "; B = ", b, "\n")
// 	}
// }

function variaveis () {
    let a, b, aux

    a = document.getElementById("a").value;
    b = document.getElementById("b").value;
    //leia(a)
    //leia(b)
    //leia(aux)
    // console.clear()

    aux = a
    a = b
    b = aux

    alert("Variáveis foram trocadas!")
    document.write("Os valores nesta troca foram: A = ", b, '<br>');
    document.write("Os valores nesta troca foram: B = ", a, '<br>');
}