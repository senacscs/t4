function inicio() {
	var numDigitado = document.getElementById('num-digitado').value;
	var numSorteado = sorteia(0, 6);
	var resultado = document.getElementById('resultado');

	if (numDigitado >= 0 && numDigitado <= 6) {
		if (numDigitado == numSorteado) {
			resultado.innerHTML = 'Os números são iguais!';
		} else {
			resultado.innerHTML = 'Os números são diferentes!';
		}

		resultado.innerHTML += '\n\nNúmero digitado: ' + numDigitado;
		resultado.innerHTML += '\nNúmero sorteado: ' + numSorteado + '\n';
	} else {
		resultado.innerHTML = 'O número digitado deve estar entre 0 e 6\n';
	}
}

function sorteia(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}