function numeroDigitado() {
    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);
 
    document.write("Variáveis antes da troca: A = " + a + "; B = " + b + "<br>");
 
    let aux = a;
    a = b;
    b = aux;
 
    document.write("Variáveis após a troca: A = " + a + "; B = " + b + "<br>");
}