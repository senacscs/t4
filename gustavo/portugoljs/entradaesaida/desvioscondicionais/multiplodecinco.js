function inicio() {
	var numero = document.getElementById('numero').value;
	var resultado = document.getElementById('resultado');
	
	if (numero % 5 == 0) {
		resultado.innerHTML = `O número ${numero} é múltiplo de 5`;
	} else {
		resultado.innerHTML = `O número ${numero} não é múltiplo de 5`;
	}
}