/*
programa
{
	inclua biblioteca Matematica --> mat

	funcao inicio()
	{
		real altura1, altura2, altura3, media_altura

		escreva("Digite a altura da primeira pessoa: ")
		leia(altura1)

		escreva("Digite a altura da segunda pessoa: ")
		leia(altura2)

		escreva("Digite a altura da terceira pessoa: ")
		leia(altura3)

		media_altura = (altura1 + altura2 + altura3) / 3

		escreva("\nA média das alturas é: ", mat.arredondar(media_altura, 2), " metros\n")
	}
}
*/

function verificarAlturaMedia() {
    // Obter os valores das alturas
    var altura1 = parseFloat(document.getElementById("altura1").value);
    var altura2 = parseFloat(document.getElementById("altura2").value);
    var altura3 = parseFloat(document.getElementById("altura3").value);

    // Verificar se todos os valores são válidos (números)
    if (isNaN(altura1) || isNaN(altura2) || isNaN(altura3)) {
        alert("Por favor, insira valores válidos para todas as alturas.");
        return;
    }

    // Calcular a altura média
    let mediaAltura = (altura1 + altura2 + altura3) / 3;

    // Exibir o resultado com base na altura média
    alert("A altura média é: " + mediaAltura.toFixed(2));  // Exibe até 2 casas decimais
}
