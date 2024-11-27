function classificarTriangulo() {
    const ladoA = parseInt(document.getElementById('ladoA').value);
    const ladoB = parseInt(document.getElementById('ladoB').value);
    const ladoC = parseInt(document.getElementById('ladoC').value);   

    const resultado = document.getElementById('resultado');
    if (ladoA === ladoB && ladoA === ladoC) {
        resultado.textContent = "Este triângulo é Equilátero";
    } else if (ladoA === ladoB || ladoB === ladoC || ladoC === ladoA) {
        resultado.textContent = "Este triângulo é Isósceles";
    } else {
        resultado.textContent = "Este triângulo é Escaleno";
    }
}