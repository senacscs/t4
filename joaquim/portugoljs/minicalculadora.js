function calcular() {
    const operando1 = parseFloat(document.getElementById("operando1").value);
    const operando2 = parseFloat(document.getElementById("operando2").value);
    const operador = document.getElementById("operador").value;

    if (isNaN(operando1) || isNaN(operando2)) {
        alert("Por favor, insira números válidos.");
        return;
    }
    if (!['+', '-', '*', '/'].includes(operador)) {
        alert("Por favor, selecione uma operação válida (+, -, *, /).");
        return;
    }

    let resultado;
    switch (operador) {
        case '+':
            resultado = operando1 + operando2;
            break;
        case '-':
            resultado = operando1 - operando2;
            break;
        case '*':
            resultado = operando1 * operando2;
            break;
        case '/':
            if (operando2 === 0) {
                alert("Divisão por zero não é permitida.");
                return;
            }
            resultado = operando1 / operando2;
            break;
    }

    document.getElementById("resultado").innerText =
        `Resultado: ${operando1} ${operador} ${operando2} = ${resultado}`;
}