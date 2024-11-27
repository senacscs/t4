function inicio() {
	var operando1 = parseFloat(document.getElementById('operando1').value);
	var operando2 = parseFloat(document.getElementById('operando2').value);
	var operador = document.getElementById('operador').value;
	var resultado = document.getElementById('resultado');

	switch (operador) {
		case '+':
			resultado.innerHTML = 'Resultado:<br><br>' + operando1 + ' + ' + operando2 + ' = ' + (operando1 + operando2);
			break;
		case '-':
			resultado.innerHTML = 'Resultado:<br><br>' + operando1 + ' - ' + operando2 + ' = ' + (operando1 - operando2);
			break;
		case '*':
			resultado.innerHTML = 'Resultado:<br><br>' + operando1 + ' * ' + operando2 + ' = ' + (operando1 * operando2);
			break;
		case '/':
			if (operando2 !== 0) {
				resultado.innerHTML = 'Resultado:<br><br>' + operando1 + ' / ' + operando2 + ' = ' + (operando1 / operando2);
			} else {
				resultado.innerHTML = 'Erro: Divisão por zero!';
			}
			break;
		default:
			resultado.innerHTML = 'Erro: Operador inválido!';
	}
}