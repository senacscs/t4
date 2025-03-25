function calcularMediaAltura() {
    // Solicita as alturas das três pessoas
    let altura1 = parseFloat(prompt("Digite a altura da primeira pessoa (em metros): "));
    let altura2 = parseFloat(prompt("Digite a altura da segunda pessoa (em metros): "));
    let altura3 = parseFloat(prompt("Digite a altura da terceira pessoa (em metros): "));

    // Calcula a média das alturas
    let mediaAltura = (altura1 + altura2 + altura3) / 3;

    // Arredonda a média para duas casas decimais
    mediaAltura = mediaAltura.toFixed(2);

    // Exibe o resultado na página
    document.getElementById("resultado").innerHTML = "A média das alturas é: " + mediaAltura + " metros";
}