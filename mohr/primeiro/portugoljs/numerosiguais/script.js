function verificarNumero(event) {
    event.preventDefault(); 

    
    const numDigitado = parseInt(document.getElementById('num_digitado').value);

    
    const numSorteado = Math.floor(Math.random() * 7);

   
    let resultadoHTML = "";
    
    if (numDigitado >= 0 && numDigitado <= 6) {
        if (numDigitado === numSorteado) {
            resultadoHTML += "<p>Os números são iguais</p>";
        } else {
            resultadoHTML += "<p>Os números são diferentes</p>";
        }

        resultadoHTML += `<p>Número digitado: ${numDigitado}</p>`;
        resultadoHTML += `<p>Número sorteado: ${numSorteado}</p>`;
    } else {
        resultadoHTML = "<p>O número digitado deve estar entre 0 e 6</p>";
    }

    
    document.getElementById('resultado').innerHTML = resultadoHTML;
}
