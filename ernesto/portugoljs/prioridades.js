let resultado;
        resultado = 5 + 4 * 2;
        document.getElementById("Resultado").textContent += `Operação: 5 + 4 * 2 = ${resultado} `;
        resultado = (5 + 4) * 2;
        document.getElementById("Resultado").textContent += `Operação: (5 + 4) * 2 = ${resultado} `;
        resultado = 1 + 2 / 3 * 4;
        document.getElementById("Resultado").textContent += `Operação: 1 + 2 / 3 * 4 = ${resultado} `;
		
        resultado = (1 + 2) / (3 * 4);
        document.getElementById("Resultado").textContent += `Operação: (1 + 2) / (3 * 4) = ${resultado}`;
