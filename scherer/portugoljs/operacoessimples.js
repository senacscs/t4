function numeroDigitado() {
   let a = parseFloat(document.getElementById("number1").value);
   let b = parseFloat(document.getElementById("number2").value);

   let soma, sub, mult, div, logA, logB;

   soma = a + b;
   sub = a - b;
   mult = a * b;
   div = a / b;
   

   log = Math.log(a) / Math.log(b);

   document.write("O resultado da soma é: " + soma + "<br>");
   document.write("O resultado da subtração é: " + sub + "<br>");
   document.write("O resultado da multiplicação é: " + mult + "<br>");
   document.write("O resultado da divisão é: " + div + "<br>");
   document.write("O logaritmo de é: ", log, "<br>")
}