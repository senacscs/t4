function getBaseLog(x, y) {
	return Math.log(y) / Math.log(x);
}

console.log(getBaseLog(2, 8));

console.log(getBaseLog(5, 625));

function calcular() {
	let a, b, soma, sub, mult, div, log;
	a = parseInt(document.getElementById("num1").value);
	b = parseInt(document.getElementById("num2").value);

	soma = a + b;
	sub = a - b;
	mult = a * b;
	div = a / b;
	log = getBaseLog(a, b);

	document.write("A soma dos números é igual a: ", soma);
	document.write("<br>A subtração dos números é igual a: ", sub);
	document.write("<br>A multiplicação dos números é igual a: ", mult);
	document.write("<br>A divisão dos números é igual a: ", div);
	document.write("<br>O log de base " + a + " do número " + b + " é igual a: ", log);
}
