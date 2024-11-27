function jogar() {
           
    const numeroDigitado = parseInt(document.getElementById('numero').value);

    const numeroSorteado = Math.floor(Math.random() * 7);

    const resultado = document.getElementById('resultado');

    if (numeroDigitado >= 0 && numeroDigitado <= 6) {
        if (numeroDigitado === numeroSorteado) {
            resultado.textContent = "Parabéns! Você acertou! Os números são iguais!";
        } else {
            resultado.textContent = "Que pena! Os números são diferentes.";
        }
        resultado.textContent += `\n\nNúmero digitado: ${numeroDigitado}`;
        resultado.textContent += `\nNúmero sorteado: ${numeroSorteado}`;
    } else {
        resultado.textContent = "O número digitado deve estar entre 0 e 6";
    }
}