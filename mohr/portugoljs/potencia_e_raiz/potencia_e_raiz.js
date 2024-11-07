function inicio() {
	let valor, potencia, raiz_quadrada;

	valor = parseFloat(prompt("Digite um valor: "));

	potencia = Math.pow(valor, 3);       // Calcula o valor elevado ao cubo
	raiz_quadrada = Math.sqrt(valor);    // Calcula a raiz quadrada do valor

	alert("O número ao cubo é: " + potencia +
		  "\nA raiz quadrada do número é: " + raiz_quadrada);
}