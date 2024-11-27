function verificarNumero(event) {
    event.preventDefault(); 

    const numero = parseInt(document.getElementById('numero').value);
    let resultadoHTML = '';

    if (numero > 0) {
        resultadoHTML = "O número é positivo";
    } else if (numero < 0) {
        resultadoHTML = "O número é negativo";
    } else {
        resultadoHTML = "O número é igual a zero";
    }

    
    document.getElementById('resultado').innerHTML = resultadoHTML;
}