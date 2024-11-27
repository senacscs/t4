function calcularMedia() {
    let m1 = parseFloat(document.getElementById("m1").value);
    let m2 = parseFloat(document.getElementById("m2").value);
    let m3 = parseFloat(document.getElementById("m3").value);

    let media = (m1 + m2 + m3) / 3;
    media = Math.round(media * 100) / 100; // Arredonda para 2 casas decimais

    document.getElementById("resultado").innerText = "A média final é: " + media;

    let comparacoes = "";
    if (m1 < media) {
        comparacoes += "A média 1 é menor que a média final\n";
    }
    if (m2 < media) {
        comparacoes += "A média 2 é menor que a média final\n";
    }
    if (m3 < media) {
        comparacoes += "A média 3 é menor que a média final\n";
    }

    document.getElementById("comparacoes").innerText = comparacoes;
}