function calcularMediaAltura() {
    let altura1 = parseFloat(document.getElementById("altura1").value);
    let altura2 = parseFloat(document.getElementById("altura2").value);
    let altura3 = parseFloat(document.getElementById("altura3").value);

    // Calcula a média das alturas
    let mediaAltura = (altura1 + altura2 + altura3) / 3;
    mediaAltura = mediaAltura.toFixed(2); // Arredonda para 2 casas decimais

    document.getElementById("resultado").textContent = `A média das alturas é: ${mediaAltura} metros.`;
}
