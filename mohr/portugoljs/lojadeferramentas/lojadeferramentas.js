function calcularTotal() {
    // Definindo os preços constantes dos produtos
    const PRECO_PARAFUSO = 1.50;
    const PRECO_ARRUELA = 2.00;
    const PRECO_PORCA = 2.50;

    // Obtendo os valores das entradas
    let nome = prompt("Digite seu nome: ");
    let quantidadeParafusos = parseInt(prompt("Digite a quantidade de parafusos que deseja comprar: "));
    let quantidadeArruelas = parseInt(prompt("Digite a quantidade de arruelas que deseja comprar: "));
    let quantidadePorcas = parseInt(prompt("Digite a quantidade de porcas que deseja comprar: "));

    // Cálculo do total a pagar
    let totalParafusos = PRECO_PARAFUSO * quantidadeParafusos;
    let totalArruelas = PRECO_ARRUELA * quantidadeArruelas;
    let totalPorcas = PRECO_PORCA * quantidadePorcas;
    let totalPagar = totalParafusos + totalArruelas + totalPorcas;

    // Exibindo o resultado na página
    let resultado = "<h3>Cliente: " + nome + "</h3>";
    resultado += "<hr>";
    resultado += "<p>Parafusos: " + quantidadeParafusos + "</p>";
    resultado += "<p>Arruelas: " + quantidadeArruelas + "</p>";
    resultado += "<p>Porcas: " + quantidadePorcas + "</p>";
    resultado += "<hr>";
    resultado += "<h4>Total a pagar: R$ " + totalPagar.toFixed(2) + "</h4>";

    // Exibindo o resultado na página
    document.getElementById("resultado").innerHTML = resultado;
}