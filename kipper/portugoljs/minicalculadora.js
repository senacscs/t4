
        function calcular() {
            // Obtém os valores dos campos de entrada
            const operando1 = parseFloat(document.getElementById('operando1').value);
            const operando2 = parseFloat(document.getElementById('operando2').value);
            const operador = document.getElementById('operador').value;   


            // Verifica a operação e realiza o cálculo
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
                    resultado = operando1 / operando2;
                    break;
                default:
                    resultado   
 = "Operador inválido";
            }

            // Exibe o resultado
            document.getElementById('resultado').textContent = `${operando1} ${operador} ${operando2} = ${resultado}`;
        }