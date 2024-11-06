// funcao inicio() 
// {
//     inteiro a, b, aux

//     escreva("Informe um valor para a variável A: ")
//     leia(a)

//     escreva("Informe um valor para a variável B: ")
//     leia(b)

//     limpa()

//     escreva("Variáveis antes da troca: \n")
//     escreva("A = ", a, "; B = ", b, "\n")

//     /* 
//      *  Realiza a troca dos valores contidos nas variáveis. É necessário utilizar 
//      *  a variável 'aux' para armazenar temporariamente o valor contido em 'a',
//      *  caso contrário este valor será perdido
//      */
    
//     aux = a
//     a = b
//     b = aux

//     escreva("\n")

//     escreva("Variáveis após a troca: \n")
//     escreva("A = ", a, "; B = ", b, "\n")
// }

function matematica(){

    let a, b, aux
    //     inteiro a, b, aux


    a = document.getElementById("numero").value
    b = document.getElementById("numero").value
    //     leia(a)
    //     leia(b)



    document.write("Variáveis antes da troca: \n")
    document.write("A = ", a, "; B = ", b, "\n")
//     escreva("Variáveis antes da troca: \n")
//     escreva("A = ", a, "; B = ", b, "\n")

    aux = a
    a = b
    b = aux
//     aux = a
//     a = b
//     b = aux

    document.write("\n")

    document.write("Variáveis após a troca: \n")
    document.write("A = ", b, "; B = ", a, "\n")
    //     escreva("Variáveis após a troca: \n")
//     escreva("A = ", a, "; B = ", b, "\n")

}