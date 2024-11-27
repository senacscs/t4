function verificarIdade()   
 {
            let idade = document.getElementById('idade').value;
            let resultado = document.getElementById('resultado');

            if (idade < 18) {
                resultado.textContent = "Você é menor de idade";
            } else {
                resultado.textContent = "Você é maior de idade";
            }
        }