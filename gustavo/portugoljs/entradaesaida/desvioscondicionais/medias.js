function calcularMedia() {
    const m1 = parseFloat(document.getElementById('m1').value);
    const m2 = parseFloat(document.getElementById('m2').value);
    const m3 = parseFloat(document.getElementById('m3').value);

    if (isNaN(m1) || isNaN(m2) || isNaN(m3)) {
        document.getElementById('resultado').innerHTML = 'Digite valores válidos!';
    } else {
        const media = (m1 + m2 + m3) / 3;
        const mediaArredondada = media.toFixed(2);

        let resultado = `A média final é: ${mediaArredondada}\n\n`;

        if (m1 < media) {
            resultado += `A média 1 (${m1}) é menor que a média final.\n`;
        }

        if (m2 < media) {
            resultado += `A média 2 (${m2}) é menor que a média final.\n`;
        }

        if (m3 < media) {
            resultado += `A média 3 (${m3}) é menor que a média final.\n`;
        }

        document.getElementById('resultado').innerHTML = resultado;
    }
}