
        function calcularMedia() {
            // Obtém as notas dos campos de entrada
            const nota1 = parseFloat(document.getElementById('nota1').value);
            const nota2 = parseFloat(document.getElementById('nota2').value);
            const nota3 = parseFloat(document.getElementById('nota3').value);   


            // Calcula  
            const media = (nota1 + nota2 + nota3) / 3;
            const mediaArredondada = media.toFixed(2);

            // Exibe a média final e as comparações
            const resultadoElement = document.getElementById('resultado');
            resultadoElement.innerHTML = `
                A média final é: ${mediaArredondada}<br>
                ${nota1 < media ? `A nota 1 é menor que a média final<br>` : ''}
                ${nota2 < media ? `A nota 2 é menor que a média final<br>` : ''}
                ${nota3 < media ? `A nota 3 é menor que a média final<br>` : ''}
            `;
        }
