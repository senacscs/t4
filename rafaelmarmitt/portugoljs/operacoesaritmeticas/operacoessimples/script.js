// function numeroDigitado() {
//     let a = parseFloat(document.getElementById("number1").value)
//     let b = parseFloat(document.getElementById("number2").value)

//     let soma, sub, mult, div, log
 
//     soma = a + b;
//     sub = a - b;
//     mult = a * b;
//     div = a / b;
 
//     document.write("O resultado da soma é:", soma)
//     document.write("O resultado da subtração é:", sub)
//     document.write("O resultado da multiplicação é:", mult)
//     document.write("O resultado da divisão é:", div)
//     document.write("O resultado do log é:", log)
// }
 
function numeroDigitado() {
    let a = parseFloat(document.getElementById("number1").value);
    let b = parseFloat(document.getElementById("number2").value);

    let soma, sub, mult, div, logA, logB;

    soma = a + b;
    sub = a - b;
    mult = a * b;
    div = a / b;

    logA = Math.log10(a);
    logB = Math.log10(b);

    document.write("O resultado da soma é: " + soma + "<br>");
    document.write("O resultado da subtração é: " + sub + "<br>");
    document.write("O resultado da multiplicação é: " + mult + "<br>");
    document.write("O resultado da divisão é: " + div + "<br>");
    document.write("O logaritmo de " + a + " é: " + logA + "<br>");
    document.write("O logaritmo de " + b + " é: " + logB + "<br>");
}