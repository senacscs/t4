function operacoesSimples() {
    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);
    
    let soma = a + b;
    let sub = a - b;
    let mult = a * b;
    let div = b !== 0 ? a / b : "Não é possível dividir por zero"; // Verificação para divisão por zero

    let resultadoMsg = `
        A soma dos números é igual a: ${soma} <br>
        A subtração dos números é igual a: ${sub} <br>
        A multiplicação dos números é igual a: ${mult} <br>
        A divisão dos números é igual a: ${div}
    `;
    
    document.getElementById("resultadoMsg").innerHTML = resultadoMsg;
}