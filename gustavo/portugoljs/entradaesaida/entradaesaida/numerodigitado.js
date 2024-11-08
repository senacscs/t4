function inicio() {
    let numero = document.getElementById("numero").value;
    let resultado = document.getElementById("resultado");

    if (numero) {
        resultado.textContent = "O número digitado foi: " + numero;
    } else {
        resultado.textContent = "Por favor, digite um número inteiro.";
    }
}
