// funcao inicio() 
// 	{
// 		inteiro metade_inteira, resto, valor
		
// 		escreva("Digite um valor: ") 
// 		leia(valor)

// 		metade_inteira = valor / 2 // Calcula a metade inteira do valor
// 		resto = valor % 3 // Calcula o resto da divisão do valor por 3
		
// 		escreva("\nA metade inteira do numero é: ", metade_inteira)
// 		escreva("\nO resto (mod) da divisão por 3 é: ", resto, "\n")
// 	}
// }


function matematica(){
    // 		cadeia matematica
    
     let inteiro, metade_inteira, resto, valor;
    // inteiro metade_inteira, resto, valor

    valor = document.getElementById("numero").value
// leia(valor)


  metade_inteira = valor / 2 
  resto = valor % 3

  document.write("\nA metade inteira do numero é: ", metade_inteira)
  document.write("\nO resto (mod) da divisão por 3 é: ", resto, "\n")



 
    }