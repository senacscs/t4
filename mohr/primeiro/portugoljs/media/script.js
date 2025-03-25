function arredondar(valor, casasDecimais) {
    const fator = Math.pow(10, casasDecimais);
    return Math.round(valor * fator) / fator;
}

function calcularMedia(event) {
    event.preventDefault(); // Evita o recarregamento da página
    const m1 = parseFloat(document.getElementById('m1').value);
    const m2 = parseFloat(document.getElementById('m2').value);
    const m3 = parseFloat(document.getElementById('m3').value);

    // Calcula a média
    const media = (m1 + m2 + m3) / 3;
    const mediaArredondada = arredondar(media, 2);

    // Mostra a média final
    let resultadoHTML = `<p>A média final é: ${mediaArredondada}</p>`;

    // Verifica se as médias individuais são menores que a média final
    if (m1 < media) {
        resultadoHTML += `<p>A média 1 (${m1}) é menor que a média final.</p>`;
    }
    if (m2 < media) {
        resultadoHTML += `<p>A média 2 (${m2}) é menor que a média final.</p>`;
    }
    if (m3 < media) {
        resultadoHTML += `<p>A média 3 (${m3}) é menor que a média final.</p>`;
    }

    document.getElementById('resultado').innerHTML = resultadoHTML;
}