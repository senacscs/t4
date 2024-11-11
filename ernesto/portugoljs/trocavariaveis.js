function trocar() {

	const a = parseInt(document.getElementById("a").value);
	const b = parseInt(document.getElementById("b").value);

	document.getElementById("resultado").innerHTML = `
	  Valores antes da troca:<br>
	  Número A = ${a}<br>
	  Número B = ${b}<br>
	`;

	const aux = a;
	a = b;
	b = aux;

	document.getElementById("resultado").innerHTML += `
	  Valores após a troca:<br>
	  Número A = ${a}<br>
	  Número B = ${b}
	`;
  }