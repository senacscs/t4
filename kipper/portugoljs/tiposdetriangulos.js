
        function classificarTriangulo() {
            // Obtém os lados do triângulo
            let ladoA = parseInt(document.getElementById("ladoA").value);
            let ladoB = parseInt(document.getElementById("ladoB").value);
            let ladoC = parseInt(document.getElementById("ladoC").value);
 
            // Verifica o tipo de triângulo
            if (ladoA === ladoB && ladoB === ladoC) {
                document.getElementById("resultado").textContent = "Este triângulo é Equilátero";
            } else if (ladoA === ladoB || ladoB === ladoC || ladoC === ladoA) {
                document.getElementById("resultado").textContent = "Este triângulo é Isósceles";
            } else {
                document.getElementById("resultado").textContent = "Este triângulo é Escaleno";
            }
        } 