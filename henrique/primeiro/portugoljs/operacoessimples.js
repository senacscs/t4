function operacoesSimples() {
    let a = parseFloat(document.getElementById("num1").value);
    let b = parseFloat(document.getElementById("num2").value);
    
    let soma = a + b;
    let sub = a - b;
    let mult = a * b;
    let div = b !== 0 ? a / b : "Não é possível dividir por zero"; 

    let resultadoMsg = `
        A soma dos números é igual a: ${soma} <br>
        A subtração dos números é igual a: ${sub} <br>
        A multiplicação dos números é igual a: ${mult} <br>
        A divisão dos números é igual a: ${div}
    `;
    
    document.getElementById("resultadoMsg").innerHTML = resultadoMsg;
}

function calcularLog() {
    let numero = parseFloat(document.getElementById("numeroLogaritmo").value);

    if (numero > 0) {
        let logaritmo = Math.log10(numero); 
        document.getElementById("resultadoMsg").innerHTML = `O logaritmo de ${numero} (base 10) é: ${logaritmo}`;
    } else {
        document.getElementById("resultadoMsg").innerHTML = "O número deve ser maior que zero para calcular o logaritmo.";
    }
}
