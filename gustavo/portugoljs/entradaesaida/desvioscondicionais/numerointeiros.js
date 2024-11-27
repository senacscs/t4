function inicio() {
	var numero = parseInt(document.getElementById('numero').value);
	var resultado = document.getElementById('resultado');

	if (numero > 0) {
		resultado.innerHTML = 'O número é positivo';
	} else if (numero < 0) {
		resultado.innerHTML = 'O número é negativo';
	} else {
		resultado.innerHTML = 'O número é igual a zero';
	}
}