function matematica() {
   let a, b, x, y, soma, sub, mult, div, logaritmo;
   
   a = parseFloat(document.getElementById("numero").value);
   b = parseFloat(document.getElementById("numero2").value);
   
   x = a;
   y = b;
   
   soma = a + b;
   sub = a - b;
   mult = a * b;
   div = a / b;
   logaritmo = Math.log(y) / Math.log(x);
   
   document.write("A soma dos números é igual a: " + soma + "<br>");	
   document.write("A subtração dos números é igual a: " + sub + "<br>");	
   document.write("A multiplicação dos números é igual a: " + mult + "<br>");	
   document.write("A divisão dos números é igual a: " + div + "<br>");
   document.write("O logaritmo de " + y + " na base " + x + " é igual a: " + logaritmo + "<br>");
}
