/*
programa
{
	funcao inicio()
	{
		inteiro opcao
		
		escreva("1) Elogio \n")
		escreva("2) Ofensa \n")
		escreva("3) Sair \n\n")

		escreva("Escolha uma opção: ")
		leia(opcao)

		limpa()

		escolha (opcao)	
		{
			caso 1: 
		 		escreva ("Voce é lindo(a)!")
		 		pare   // Impede que as instruções do caso 2 sejam executadas
		 	caso 2: 
		 		escreva ("Voce é um monstro!")
		 		pare   // Impede que as instruções do caso 2 sejam executadas
		 	caso 3: 
		 		escreva ("Tchau!")
		 		pare
		 	caso contrario: // Será executado para qualquer opção diferente de 1, 2 ou 3
		 		escreva ("Opção Inválida !")
		}

		escreva("\n")
	}
}
*/

function escolherOpcao() {
    const input = document.getElementById('opcaoInput');
    const resultado = document.getElementById('resultado');
    const opcao = parseInt(input.value); 

    resultado.innerHTML = ''; 

    switch (opcao) {
        case 1:
            resultado.innerHTML = "Você é lindo(a)!";
            break;
        case 2:
            resultado.innerHTML = "Você é um monstro!";
            break;
        case 3:
            resultado.innerHTML = "Tchau!";
            break;
        default:
            resultado.innerHTML = "Opção Inválida!";
    }

    input.value = ''; 
}

document.getElementById('btnConfirmar').addEventListener('click', escolherOpcao);


