
        function verificarSinal() {
            // Obtém o número digitado pelo usuário
            const numero = parseInt(document.getElementById('numero').value);

            // Verifica o sinal do número
            if (numero > 0) {
                document.getElementById('resultado').textContent = "O número é positivo";
            } else if (numero < 0) {
                document.getElementById('resultado').textContent = "O número é negativo";
            } else {
                document.getElementById('resultado').textContent = "O número 1 é igual a zero";
            }
        }

