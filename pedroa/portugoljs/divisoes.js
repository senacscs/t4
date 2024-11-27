function calcularValores() {
    let valor = parseInt(document.getElementById("valor").value);
    let metadeInteira = Math.floor(valor / 2);
    let resto = valor % 3;

    document.getElementById("resultado").innerText = 
        "A metade inteira do número é: " + metadeInteira + 
        "\nO resto (mod) da divisão por 3 é: " + resto;
}