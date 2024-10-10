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
function numeroDigitado() {
    //inteiro numero
    let numero;
    //leia(numero)
    numero = document.getElementById("numero").value
    //escreva("O número digitado foi: ", numero, "\n")
    console.log("O número digitado foi: ", numero, "\n")
    alert("O número digitado foi: ", numero, "\n")
    document.write("O número digitado foi: ", numero, "\n")
    }