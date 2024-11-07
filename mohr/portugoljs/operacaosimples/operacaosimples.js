function inicio() {
    let a, b, soma, sub, mult, div;

    a = parseFloat(prompt("Digite o primeiro número: "));
    b = parseFloat(prompt("Digite o segundo número: "));

    soma = a + b; // Soma os dois valores
    sub = a - b;  // Subtrai os dois valores
    mult = a * b; // Multiplica os dois valores
    div = a / b;  // Divide os dois valores

    alert("A soma dos números é igual a: " + soma +
          "\nA subtração dos números é igual a: " + sub +
          "\nA multiplicação dos números é igual a: " + mult +
          "\nA divisão dos números é igual a: " + div);
}
