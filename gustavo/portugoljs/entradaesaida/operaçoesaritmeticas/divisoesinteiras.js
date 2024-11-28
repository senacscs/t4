function inicio() {
    // Lê o valor do input
    var valor = parseInt(document.getElementById("numero").value); 

    // Verifica se o valor é um número válido
    if (isNaN(valor)) {
        alert("Por favor, insira um número válido.");
        return;
    }

    // Exibe um alerta com o número digitado
    alert("O número digitado foi: " + valor);

    // Calcula a metade inteira e o resto
    var metade_inteira = Math.floor(valor / 2);  // Metade inteira usando Math.floor
    var resto = valor % 3;  // Resto da divisão por 3

    // Exibe os resultados no HTML dentro do elemento #mensagem
    document.getElementById("mensagem").textContent = "A metade inteira do número é: " + metade_inteira + 
        ", e o resto da divisão por 3 é: " + resto;
}