function calcular() {
    const operando1 = parseFloat(document.getElementById('operando1').value);
    const operando2 = parseFloat(document.getElementById('operando2').value);
    const operador = document.getElementById('operador').value;   


    let resultado;
    switch (operador) {
        case '+':
            resultado = operando1 + operando2;
            break;
        case '-':
            resultado = operando1 - operando2;
            break;
        case '/':
            resultado = operando1 / operando2;   

            break;
        case '*':
            resultado = operando1 * operando2;
            break;
        default:
            resultado   
= "Operador inválido";
    }
    document.getElementById('resultado').textContent = `${operando1} ${operador} ${operando2} = ${resultado}`;
}