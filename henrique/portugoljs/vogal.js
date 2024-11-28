function verificarVogal() {
    const letra = document.getElementById('letraInput').value;
    let resultado;
    if ('AEIOUaeiou'.includes(letra)) {
        resultado = `A letra '${letra}' é uma vogal.`;
    } else {
        resultado = `A letra '${letra}' é uma consoante.`;
    }
    document.getElementById('resultadoMsg').innerText = resultado;
}