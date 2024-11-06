function calcular() {
    // Lê o valor do input
    var valor = parseInt(document.getElementById("valor").value);

    // Verifica se o valor é um número válido
    if (isNaN(valor)) {
        alert("Por favor, insira um número válido.");
        return;
    }

    // Calcula a metade inteira e o resto
    var metade_inteira = Math.floor(valor / 2);  // Metade inteira usando Math.floor
    var resto = valor % 3;  // Resto da divisão por 3

    // Exibe os resultados no HTML
    document.getElementById("metade_inteira").textContent = "A metade inteira do número é: " + metade_inteira;
    document.getElementById("resto").textContent = "O resto (mod) da divisão por 3 é: " + resto;
}
