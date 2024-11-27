
        function jogar() {
            // Obtém o número digitado pelo usuário
            let numDigitado = parseInt(document.getElementById("numeroDigitado").value);
 
            // Gera um número aleatório entre 0 e 6
            let numSorteado = Math.floor(Math.random() * 7);
 
            // Verifica se o número digitado está dentro do intervalo válido
            if (numDigitado >= 0 && numDigitado <= 6) {
                // Compara os números
                if (numDigitado === numSorteado) {
                    document.getElementById("resultado").textContent = "Parabéns! Você acertou! O número sorteado foi " + numSorteado;
                } else {
                    document.getElementById("resultado").textContent = "Que pena! Você errou. O número sorteado foi " + numSorteado;
                }
            } else {
                document.getElementById("resultado").textContent = "O número digitado deve estar entre 0 e 6.";
            }
        }
