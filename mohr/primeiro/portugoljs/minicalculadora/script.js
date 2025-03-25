function calcularResultado(event) {
    event.preventDefault(); // Impede o recarregamento da página

    // Obtendo os valores dos operandos e operador
    const operando1 = parseFloat(document.getElementById('operando1').value);
    const operando2 = parseFloat(document.getElementById('operando2').value);
    const operador = document.getElementById('operador').value.trim();

    let resultado = 0;
    let resultadoHTML = "";

    // Verificando a operação e calculando o resultado
    if (operador === '+') {
        resultado = operando1 + operando2;
    } else if (operador === '-') {
        resultado = operando1 - operando2;
    } else if (operador === '/') {
        // Verificando se o divisor não é zero
        if (operando2 === 0) {
            resultadoHTML = "Erro: Não é possível dividir por zero.";
        } else {
            resultado = operando1 / operando2;
        }
    } else if (operador === '*') {
        resultado = operando1 * operando2;
    } else {
        resultadoHTML = "Operação inválida! Use apenas +, -, * ou /.";
    }

    // Exibindo o resultado
    if (!resultadoHTML) {
        resultadoHTML = `${operando1} ${operador} ${operando2} = ${resultado}`;
    }

    // Exibindo o resultado no HTML
    document.getElementById('resultado').innerHTML = resultadoHTML;
}