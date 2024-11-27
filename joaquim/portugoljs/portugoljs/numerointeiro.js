function verificarSinal() {
    const numero = parseInt(document.getElementById('numero').value);
    const resultado = document.getElementById('resultado');

    if (numero > 0) {
        resultado.textContent   
= "O número é positivo";
    } else if (numero < 0) {
        resultado.textContent = "O número é negativo";
    } else {
        resultado.textContent = "O número é  igual a zero";
    }
}