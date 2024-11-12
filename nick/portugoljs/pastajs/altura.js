function calcularMedia() {
    // Captura os valores dos inputs
    const altura1 = parseFloat(document.getElementById("altura1").value);
    const altura2 = parseFloat(document.getElementById("altura2").value);
    const altura3 = parseFloat(document.getElementById("altura3").value);

    // Verifica se os valores são números válidos
    if (isNaN(altura1) || isNaN(altura2) || isNaN(altura3)) {
      document.getElementById("resultado").innerText = "Por favor, digite valores numéricos válidos para todas as alturas.";
      return;
    }

    // Calcula a média das alturas
    const mediaAltura = (altura1 + altura2 + altura3) / 3;

    // Exibe o resultado arredondado para duas casas decimais
    document.getElementById("resultado").innerHTML = `
      <p>A média das alturas é: ${mediaAltura.toFixed(2)} metros</p>
    `;
  }