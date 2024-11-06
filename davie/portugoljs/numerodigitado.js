/* programa
{
    function inicio ()
    {
      inteiro numero

      escreva("Digite um número inteiro: ")
      leia(numero)

      escreva("O número foi digitado foi:", numero, "\n")
    } 
}*/

function numeroDigitado() {
  //inteiro numero
  let numero;
  //leia(numero)
  numero = document.getElementById("numero").value;
  //escreva("O número digitadO foi: ", numero, "\n")
  console.log("O número digitado foi: ", numero);
  alert("O número digitado foi: ", numero);
  document.write("O número digitado foi: ", numero);
}

