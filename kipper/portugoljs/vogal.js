
function verificarVogal() {
    const letra = document.getElementById('letraInput').value;
    const resultado = document.getElementById('resultado');

    if (/[aeiouAEIOU]/.test(letra)) {
        resultado.textContent = `A letra '${letra}' é uma vogal`;
    } else {
        resultado.textContent = `A letra '${letra}' é uma consoante`;
    }
}
