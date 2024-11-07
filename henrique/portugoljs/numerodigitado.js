function mostrarNumero() {
    const numero = document.getElementById('numeroInput').value;
    document.getElementById('resultadoMsg').innerText = `O número digitado foi ${numero}`;
}