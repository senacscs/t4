function trocaValores() {
    let a, b, aux;

   
    a = parseInt(prompt("Informe um valor para a variável A: "));
    b = parseInt(prompt("Informe um valor para a variável B: "));

  
    let resultado = "Variáveis antes da troca:<br>";
    resultado += "A = " + a + "; B = " + b + "<br>";


    aux = a;
    a = b;
    b = aux;

    
    resultado += "<br>Variáveis após a troca:<br>";
    resultado += "A = " + a + "; B = " + b;


    document.getElementById("resultado").innerHTML = resultado;
}