function inicio() {
	var nome = document.getElementById('nome').value;
	var nota1 = parseFloat(document.getElementById('nota1').value);
	var nota2 = parseFloat(document.getElementById('nota2').value);
	var nota3 = parseFloat(document.getElementById('nota3').value);
	var media = (nota1 + nota2 + nota3) / 3;
	var resultado = document.getElementById('resultado');

	if (media >= 6) {
		resultado.innerHTML = 'Parabéns ' + nome + '!\nVocê foi aprovado com a média ' + arredondar(media, 2);
	} else {
		resultado.innerHTML = 'Que pena ' + nome + '!\nVocê foi reprovado com a média ' + arredondar(media, 2);
	}
}

function arredondar(numero, casasDecimais) {
	return numero.toFixed(casasDecimais);
}