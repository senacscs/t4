function verificarMultiplo() {
    let numero = parseInt(document.getElementById('numero').value);
    let resultado = document.getElementById('resultado');

    if (numero % 5 === 0) {
        resultado.textContent = `O número ${numero} é múltiplo de 5`;
    } else {
        resultado.textContent = `O número ${numero} não é múltiplo de 5`;
    }
}