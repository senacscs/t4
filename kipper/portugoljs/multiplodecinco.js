
        function verificarMultiplo() {
            // Obtém o número digitado pelo usuário
            let numero = parseInt(document.getElementById("numero").value);
 
            // Verifica se o número é múltiplo de 5
            if (numero % 5 === 0) {
                document.getElementById("resultado").textContent = `O número ${numero} é múltiplo de 5.`;
            } else {
                document.getElementById("resultado").textContent = `O número ${numero} não é múltiplo de 5.`;
            }
        }