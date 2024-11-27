
        function verificarAprovacao() {
            // Obtém os dados do usuário
            let nome = document.getElementById("nome").value;
            let nota1 = parseFloat(document.getElementById("nota1").value);
            let nota2 = parseFloat(document.getElementById("nota2").value);
            let nota3 = parseFloat(document.getElementById("nota3").value);
 
            // Calcula a média
            let media = (nota1 + nota2 + nota3) / 3;
 
            // Arredonda a média para duas casas decimais
            media = media.toFixed(2);
 
            // Verifica se o aluno foi aprovado
            if (media >= 6) {
                document.getElementById("resultado").textContent = `Parabéns, ${nome}! Você foi aprovado com a média ${media}.`;
            } else {
                document.getElementById("resultado").textContent = `Que pena, ${nome}! Você foi reprovado com a média ${media}.`;
            }
        }
