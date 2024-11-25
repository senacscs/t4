// inclua biblioteca Matematica --> mat

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

function matematica() {
    let altura1, altura2, altura3, media_altura;

    altura1 = parseFloat(document.getElementById("numero1").value);
    altura2 = parseFloat(document.getElementById("numero2").value);
    altura3 = parseFloat(document.getElementById("numero3").value);

    media_altura = (altura1 + altura2 + altura3) / 3;

    document.write("\nA média das alturas é: ", Math.round(media_altura, 2), " metros\n");
}
