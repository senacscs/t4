function calcularMediaAltura() {
    let altura1 = parseFloat(prompt("Digite a altura da primeira pessoa (em metros): "));
    let altura2 = parseFloat(prompt("Digite a altura da segunda pessoa (em metros): "));
    let altura3 = parseFloat(prompt("Digite a altura da terceira pessoa (em metros): "));


    let mediaAltura = (altura1 + altura2 + altura3) / 3;

   
    mediaAltura = mediaAltura.toFixed(2);


    document.getElementById("resultado").innerHTML = "A média das alturas é: " + mediaAltura + " metros";
}