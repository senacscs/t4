function numeroDigitado() {
    let a = parseFloat(document.getElementById("number1").value)
    let b = parseFloat(document.getElementById("number2").value)
 
    let soma, sub, mult, div
 
    soma = a + b;
    sub = a - b;
    mult = a * b;
    div = a / b;
 
    document.write("O resultado da soma é:", soma)
    document.write("O resultado da subtração é:", sub)
    document.write("O resultado da multiplicação é:", mult)
    document.write("O resultado da divisão é:", div)
}
 