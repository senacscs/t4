function calcularMediaAltura() {
    let altura1 = parseFloat(document.getElementById('altura1').value);
    let altura2 = parseFloat(document.getElementById('altura2').value);
    let altura3 = parseFloat(document.getElementById('altura3').value);
    let media_altura = (altura1 + altura2 + altura3) / 3;
    media_altura = Math.round(media_altura * 100) / 100; // Arredonda para 2 casas decimais
    let resultado = "A média das alturas é: " + media_altura + " metros";
    document.getElementById('resultado').innerText = resultado;
}