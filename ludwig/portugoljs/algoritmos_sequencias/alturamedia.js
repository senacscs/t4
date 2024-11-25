/* programa
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

	function calcularMedia() {
		let altura1 = parseFloat(document.getElementById("altura1").value);
		let altura2 = parseFloat(document.getElementById("altura2").value);
		let altura3 = parseFloat(document.getElementById("altura3").value);

		let media_altura = (altura1 + altura2 + altura3) / 3;

		document.write("A média das alturas é: ", media_altura)
	}