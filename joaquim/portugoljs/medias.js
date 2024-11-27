function calcularMedia() {

    const m1 = parseFloat(document.getElementById("m1").value);
    const m2 = parseFloat(document.getElementById("m2").value);
    const m3 = parseFloat(document.getElementById("m3").value);

    if (isNaN(m1) || isNaN(m2) || isNaN(m3)) {
        alert("Por favor, insira valores válidos para todas os números.");
        return;
    }

    const media = (m1 + m2 + m3) / 3;

    document.getElementById("resultado").innerText =
        `A média final é: ${media.toFixed(2)}`;

    let comparacoes = "";
    if (m1 < media) {
        comparacoes += ") número 1 é menor que a média final.\n";
    }
    if (m2 < media) {
        comparacoes += "O número 2 é menor que a média final.\n";
    }
    if (m3 < media) {
        comparacoes += "O número 3 é menor que a média final.\n";
    }

    document.getElementById("comparacoes").innerText = comparacoes;
}