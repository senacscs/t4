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

function troca(){
    let v3;
    let v1 = document.getElementById('var1').value;
    let v2 = document.getElementById('var2').value;

    v3 = v1;
    v1 = v2; 
    v2 = v3

    document.getElementById('res').innerText = `Valores antes da troca ${v2} e ${v1} \n valores após a troca ${v1} e ${v2}`;

}