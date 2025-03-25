function verificarLetra(event) {
    event.preventDefault();
    const letra = document.getElementById('letra').value.trim();
    const resultadoDiv = document.getElementById('resultado');

    if (!letra || letra.length !== 1 || !isNaN(letra)) {
        resultadoDiv.textContent = "Por favor, digite apenas uma letra válida.";
        return;
    }

    if (
        letra === 'A' || letra === 'E' || letra === 'I' || letra === 'O' || letra === 'U' ||
        letra === 'a' || letra === 'e' || letra === 'i' || letra === 'o' || letra === 'u'
    ) {
        resultadoDiv.textContent = `A letra '${letra}' é uma vogal.`;
    } else {
        resultadoDiv.textContent = `A letra '${letra}' é uma consoante.`;
    }
}