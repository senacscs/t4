function template() {
    let inp = document.getElementById("#input").value;

    document.write(inp);
}


// programa
// {
// 	inclua biblioteca Matematica --> mat

// 	funcao inicio()
// 	{
// 		real altura1, altura2, altura3, media_altura

// 		escreva("Digite a altura da primeira pessoa: ")
// 		leia(altura1)

// 		escreva("Digite a altura da segunda pessoa: ")
// 		leia(altura2)

// 		escreva("Digite a altura da terceira pessoa: ")
// 		leia(altura3)

// 		media_altura = (altura1 + altura2 + altura3) / 3

// 		escreva("\nA média das alturas é: ", mat.arredondar(media_altura, 2), " metros\n")
// 	}
// }

function altura(){
    let inp = parseFloat(document.getElementById("input").value);
    let inp2 = parseFloat(document.getElementById("input2").value);
    let inp3 = parseFloat(document.getElementById("input3").value);

    let media = (inp+inp2+inp3)/3;

    document.write(`a média dos três é: ${media}`);
}

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
} */

function divisoesInteiras(){
    let inp = parseInt(document.getElementById("numero").value);

    document.write(`a metade desse número é ${inp/2}`);
    document.write(`<br> o resto se tu dividir por 3 é ${inp%3}`);
}

// programa 
// {
// 	funcao inicio ()
// 	{	
// 		// Os preços dos produtos são definidos em constantes
		
// 		const real PRECO_PARAFUSO = 1.50
// 		const real PRECO_ARRUELA  = 2.00
// 		const real PRECO_PORCA    = 2.50

// 		cadeia nome
// 		inteiro quantidade_parafusos, quantidade_arruelas, quantidade_porcas 
// 		real total_parafusos, total_arruelas, total_porcas, total_pagar 

// 		escreva("Digite seu nome: ") 
// 		leia(nome) 
		
// 		escreva("\nDigite a quantidade de parafusos que deseja comprar: ") 
// 		leia(quantidade_parafusos)
		
// 		escreva("Digite a quantidade de arruelas que deseja comprar: ") 
// 		leia(quantidade_arruelas)

// 		escreva("Digite a quantidade de porcas que deseja comprar: ") 
// 		leia(quantidade_porcas)

// 		/*
// 		 * Cálculo dos valores a serem pagos. O cálculo é feito multiplicando
// 		 * a quantidade de itens vendidos pelo preço de cada item
// 		 */		
// 		total_parafusos = PRECO_PARAFUSO * quantidade_parafusos
// 		total_arruelas = PRECO_ARRUELA * quantidade_arruelas
// 		total_porcas = PRECO_PORCA * quantidade_porcas
		
// 		total_pagar = total_parafusos + total_porcas + total_arruelas 

// 		limpa()
		
// 		escreva("Cliente: ", nome, "\n")
// 		escreva("===============================\n")
// 		escreva("Parafusos: ", quantidade_parafusos, "\n")
// 		escreva("Arruelas: " , quantidade_arruelas, "\n")
// 		escreva("Porcas: ", quantidade_porcas, "\n")
// 		escreva("===============================\n")
// 		escreva("Total a pagar:  R$ ", total_pagar, "\n")
// 	} 
// }

function ferramenta() {
    let nome = document.getElementById("nome").value;
    let parafuso = parseInt(document.getElementById("parafuso").value);
    let arruela = parseInt(document.getElementById("arruela").value);
    let porca = parseInt(document.getElementById("porca").value);

    document.writeln(`Cliente: ${nome} <br>`);
    document.writeln("===============================<br>");
    document.writeln(`Parafusos: ${parafuso}<br>`);
    document.writeln(`Arruelas: ${arruela}<br>`);
    document.writeln(`Porcas: ${porca}<br>`);
    document.writeln("===============================<br>");
    document.writeln(`Total: ${(parafuso*1.5)+(arruela*2)+(porca*2.5)}`);
}

/*programa 
{ 
   funcao inicio () 
   { 
       inteiro numero
   	
       escreva("Digite um número inteiro: ")
       leia(numero)
   	
       escreva("O número digitado foi: ", numero, "\n")
   } 
} */

//    programa 
// {
// 	funcao inicio()
// 	{
// 		const inteiro MAIORIDADE = 18
		
// 		inteiro idade, anos
		
// 		escreva("Digite sua idade: ")
// 		leia(idade)

// 		// Calcula quantos anos faltam para atingir a maioridade
// 		anos = MAIORIDADE - idade 

// 		se (anos > 0)
// 		{
// 			escreva("Falta(m) ", anos, " ano(s) para você atingir a maioridade\n")
// 		}
// 		senao 
// 		{
// 			escreva("Você já atingiu a maioridade\n")
// 		}
// 	}
// }

function maioridade(){
    let inp = parseInt(document.getElementById("numero").value);

    if(inp >= 18){
        document.write("yippeee! já pode falar palavrão");
    }
    else{
        document.write(`falta ${18-inp} anos pra tu virar grandinho`)
    }
}

function numeroDigitado() {
    //inteiro numero//
    let numero = document.getElementById("numero").value;

    console.log("O número digitado foi: ", numero);
    alert("O número digitado foi: ", numero);
    document.write("O número digitado foi: ", numero);
}
/*programa 
{ 
    funcao inicio () 
    {
        escreva("Olá Mundo!\n")
    } 
} */

function olamundo() {
    document.write("Olá Mundo!")
}


/*programa
{
    funcao inicio()
    {
        real a, b, soma, sub, mult, div
    	
        escreva("Digite o primeiro número: ")
        leia(a)

        escreva("Digite o segundo número: ")
        leia(b)

        soma = a + b // Soma os dois valores
        sub  = a - b // Subtrai os dois valores
        mult = a * b // Multiplica os dois valores
        div  = a / b // Divide os dois valores

        escreva("\nA soma dos números é igual a: ", soma) 		// Exibe o resultado da soma
        escreva("\nA subtração dos números é igual a: ", sub) 		// Exibe o resultado da subtração
        escreva("\nA multiplicação dos números é igual a: ", mult) 	// Exibe o resultado da multiplicação
        escreva("\nA divisão dos números é igual a: ", div, "\n") 	// Exibe o resultado da divisão
    } 
} */

function conta() {
    let input = parseInt(document.getElementById("input").value);
    let input2 = parseInt(document.getElementById("inputdois").value);

    document.writeln("soma: " + (input + input2));
    document.writeln("subtração: " + (input - input2));
    document.writeln("multiplicação: " + (input * input2));
    document.writeln("divisão: " + (input / input2));
    document.writeln("logaritmo: " + (Math.log(input2) / Math.log(input)));
}

/*
programa
{
    inclua biblioteca Matematica --> mat  // Inclui a biblioteca Matemática
	
    funcao inicio() 
    {
        real valor, potencia, raiz_quadrada
    	
        escreva("Digite um valor: ") 
        leia(valor)

        potencia = mat.potencia(valor, 3.0)  	// Calcula o valor elevado ao cubo
        raiz_quadrada = mat.raiz (valor, 2.0) 	// Calcula a raiz quadrada do valor

        // Exibe os resultados
    	
        escreva("\nO número ao cubo é: ", potencia, "\n")
        escreva("A raiz quadrada do número é: ", raiz_quadrada, "\n")
    }
} */

/*
programa
{
funcao inicio()
{
    real resultado

	
    resultado = 5.0 + 4.0 * 2.0
    escreva("Operação: 5 + 4 * 2 = ", resultado) 


	
    resultado = (5.0 + 4.0) * 2.0
    escreva("\nOperação: (5 + 4) * 2 = ", resultado)		

	
    resultado = 1.0 + 2.0 / 3.0 * 4.0 
    escreva("\nOperação: 1 + 2 / 3 * 4 = ", resultado)

	
    resultado = (1.0 + 2.0) / (3.0 * 4.0)
    escreva("\nOperação: (1 + 2) / (3 * 4) = ", resultado, "\n")
}
} */

/*programa
{
funcao inicio ()
{
    cadeia nome

    escreva("Digite seu nome: ")
    leia(nome)
}
} */

function seunome() {
    let nome = document.getElementById("nome").value
    document.write("Oi, " + nome)

}

//programa
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
		
// 		aux = a
// 		a = b
// 		b = aux

// 		escreva("\n")

// 		escreva("Variáveis após a troca: \n")
// 		escreva("A = ", a, "; B = ", b, "\n")
// 	}
//}