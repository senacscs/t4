function inicio() {
	var lado_a = parseInt(document.getElementById('lado_a').value);
	var lado_b = parseInt(document.getElementById('lado_b').value);
	var lado_c = parseInt(document.getElementById('lado_c').value);
	var resultado = document.getElementById('resultado');

	if (lado_a == lado_b && lado_a == lado_c) {
		resultado.innerHTML = 'Este triângulo é Equilátero';
	} else {
		if (lado_a == lado_b || lado_b == lado_c || lado_c == lado_a) {
			resultado.innerHTML = 'Este triângulo é Isósceles';
		} else {
			resultado.innerHTML = 'Este triângulo é Escaleno';
		}
	}
}