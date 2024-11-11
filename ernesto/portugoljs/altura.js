function Calcular() {
	
	const altura1 = parseFloat(document.getElementById("altura1").value);
	const altura2 = parseFloat(document.getElementById("altura2").value);
	const altura3 = parseFloat(document.getElementById("altura3").value);

	const media = (altura1 + altura2 + altura3) / 3 ;

	const mediaArredondada = media.toFixed(2);

	document.getElementById("resultado").textContent = `A média das alturas é: ${mediaArredondada} centimetros`;
  }
