let resultado;

        resultado = 5 + 4 * 2;
        document.getElementById("resultado").textContent += `Operação: 5 + 4 * 2 = ${resultado} <br>`;

        resultado = (5 + 4) * 2;
        document.getElementById("resultado").textContent += `Operação: (5 + 4) * 2 = ${resultado} <br>`;

        resultado = 1 + 2 / 3 * 4;
        document.getElementById("resultado").textContent += `Operação: 1 + 2 / 3 * 4 = ${resultado} <br>`;

        resultado = (1 + 2) / (3 * 4);
        document.getElementById("resultado").textContent += `Operação: (1 + 2) / (3 * 4) = ${resultado}`;