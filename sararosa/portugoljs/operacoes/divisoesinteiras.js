/*
programa
{
	funcao inicio() 
	{
		inteiro metade_inteira, resto, valor
		
		escreva("Digite um valor: ") 
		leia(valor)

		metade_inteira = valor / 2 // Calcula a metade inteira do valor
		resto = valor % 3 // Calcula o resto da divisão do valor por 3
		
		escreva("\nA metade inteira do numero é: ", metade_inteira)
		escreva("\nO resto (mod) da divisão por 3 é: ", resto, "\n")
	}
}
*/
function inicio() {
    let metade_inteira, resto, valor;
    valor = parseFloat(prompt("Digite o primeiro número:"));

    metade_inteira = valor / 2;
    resto = valor % 3;
    console.log("A metade inteira do número é igual a: " + metade_inteira);
    console.log("O resto da divisão do número por 3 é igual a: " + resto);
    document.write("A metade inteira do número é igual a: " + metade_inteira + "<br>");      
    document.write("O resto da divisão do número por 3 é igual a: " + resto + "<br>");   
}