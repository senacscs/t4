function verificarLetra() {
    let letra = document.getElementById('letra').value;
    let resultado = document.getElementById('resultado');

    if ('AEIOUaeiou'.includes(letra)) {
        resultado.textContent = `A letra '${letra}' é uma vogal`;
    } else {
        resultado.textContent = `A letra '${letra}' é uma consoante`;
    }
}