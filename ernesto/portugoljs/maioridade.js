function Calcular() {
	const Maioridade = 18;

	const idade = parseInt(document.getElementById("Idade").value);

	const AnosFaltantes = Maioridade - idade;

	if (AnosFaltantes > 0) {
	  document.getElementById("Resultado").textContent = `Falta(m) ${AnosFaltantes} ano(s) para você alcançar a maioridade.`;
	} else {
	  document.getElementById("Resultado").textContent = "Você já alcançou a maioridade.";
	}
}
