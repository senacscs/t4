function miniCalculadora() {
    const primeiroNumero = parseFloat(document.getElementById("primeiroNumero").value);
    const segundoNumero = parseFloat(document.getElementById("segundoNumero").value);
    const operacao = document.getElementById("operacao").value;

    let resultado;

    if (isNaN(primeiroNumero) || isNaN(segundoNumero)) {
        document.getElementById("resultadoMsg").innerText = "Por favor, insira números válidos.";
        return;
    }

    switch (operacao) {
        case '+':
            resultado = primeiroNumero + segundoNumero;
            break;
        case '-':
            resultado = primeiroNumero - segundoNumero;
            break;
        case '*':
            resultado = primeiroNumero * segundoNumero;
            break;
        case '/':
            if (segundoNumero === 0) {
                document.getElementById("resultadoMsg").innerText = "Divisão por zero não é permitida.";
                return;
            }
            resultado = primeiroNumero / segundoNumero;
            break;
        default:
            document.getElementById("resultadoMsg").innerText = "Operação inválida.";
            return;
    }

    document.getElementById("resultadoMsg").innerText = `Resultado: ${primeiroNumero} ${operacao} ${segundoNumero} = ${resultado}`;
}
