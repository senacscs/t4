function calcularMedia() {
    const altura1 = parseFloat(document.getElementById("altura1").value);
    const altura2 = parseFloat(document.getElementById("altura2").value);
    const altura3 = parseFloat(document.getElementById("altura3").value);
    let resultado = '';

    if (!isNaN(altura1) && !isNaN(altura2) && !isNaN(altura3)) {
        const mediaAltura = (altura1 + altura2 + altura3) / 3;
        const mediaArredondada = mediaAltura.toFixed(2);

        resultado = `A média das alturas é: ${mediaArredondada} metros`;
    } else {
        resultado = "Por favor, insira valores válidos para todas as alturas.";
    }

    document.getElementById("result").innerHTML = resultado;
}