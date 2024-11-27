
        function verificarIdade() {
            // Obtém a idade digitada pelo usuário
            const idade = parseInt(document.getElementById('idade').value);

            // Verifica se a idade é menor que 18
            if (idade < 18) {
                document.getElementById('resultado').textContent = "Você é menor de idade.";
            } else {
                document.getElementById('resultado').textContent = "Você é maior de idade.";
            }
        }
