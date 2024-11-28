function calcularMedia() {
    let m1 = parseFloat(document.getElementById('m1').value);
    let m2 = parseFloat(document.getElementById('m2').value);
    let m3 = parseFloat(document.getElementById('m3').value);   


    let media = (m1 + m2 + m3) / 3;
    media = media.toFixed(2);


    let resultado = document.getElementById('resultado');
    resultado.textContent = `A média final é: ${media}`;

    if (m1 < media) {
        resultado.textContent += "\nA média 1 é menor que a média final";
    }
    if (m2 < media) {
        resultado.textContent += "\nA média 2 é menor que a média final";
    }
    if (m3 < media) {
        resultado.textContent += "\nA média 3 é menor que a média final";
    }
}