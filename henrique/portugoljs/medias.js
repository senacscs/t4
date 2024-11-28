function calcularMedias() {
    const m1 = parseFloat(document.getElementById('media1Input').value);
    const m2 = parseFloat(document.getElementById('media2Input').value);
    const m3 = parseFloat(document.getElementById('media3Input').value);

    const mediaFinal = ((m1 + m2 + m3) / 3).toFixed(2);
    let resultado = `A média final é: ${mediaFinal}\n`;

    if (m1 < mediaFinal) resultado += `A média 1 (${m1}) é menor que a média final.\n`;
    if (m2 < mediaFinal) resultado += `A média 2 (${m2}) é menor que a média final.\n`;
    if (m3 < mediaFinal) resultado += `A média 3 (${m3}) é menor que a média final.`;

    document.getElementById('resultadoMsg').innerText = resultado;
}