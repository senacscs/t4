function numeroDigitado() {
    let numero = document.getElementById("numero").value; // Obtém o valor do input
    alert("O número digitado foi: " + numero); // Exibe o alert com o número
    console.log("O número digitado foi: ", numero); // Opcional: log no console
    document.getElementById("mensagem").innerText = "O número digitado foi: " + numero; // Exibe na página
}
