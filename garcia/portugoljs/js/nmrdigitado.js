//programa 
// { 
// 	funcao inicio () 
// 	{ 
// 		inteiro numero
		
// 		escreva("Digite um número inteiro: ")
// 		leia(numero)
		
// 		escreva("O número digitado foi: ", numero, "\n")
// 	} 
// }

function nmr(){
  const nume = document.getElementById('ipt').value;
  document.getElementById('res').innerText = `O numero escolhido é ${nume}`
}