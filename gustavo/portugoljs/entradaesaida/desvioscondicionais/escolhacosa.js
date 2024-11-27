function inicio() {
	var opcao = parseInt(document.getElementById('opcao').value);
	var resultado = document.getElementById('resultado');

	switch (opcao) {
		case 1:
			resultado.innerHTML = 'Você é lindo(a)!';
			break;
		case 2:
			resultado.innerHTML = 'Você é um monstro!';
			break;
		case 3:
			resultado.innerHTML = 'Tchau!';
			break;
		default:
			resultado.innerHTML = 'Opção Inválida!';
	}
}