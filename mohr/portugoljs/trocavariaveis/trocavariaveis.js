function trocaValores() {
    let a, b, aux;

    // Solicita os valores para as variáveis A e B
    a = parseInt(prompt("Informe um valor para a variável A: "));
    b = parseInt(prompt("Informe um valor para a variável B: "));

    // Exibe as variáveis antes da troca
    let resultado = "Variáveis antes da troca:<br>";
    resultado += "A = " + a + "; B = " + b + "<br>";

    // Realiza a troca dos valores
    aux = a;
    a = b;
    b = aux;

    // Exibe as variáveis após a troca
    resultado += "<br>Variáveis após a troca:<br>";
    resultado += "A = " + a + "; B = " + b;

    // Exibe o resultado na página
    document.getElementById("resultado").innerHTML = resultado;
}