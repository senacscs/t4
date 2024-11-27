function classificarTriangulo() {
    const ladoA = parseInt(document.getElementById("ladoA").value);
    const ladoB = parseInt(document.getElementById("ladoB").value);
    const ladoC = parseInt(document.getElementById("ladoC").value);

    if (isNaN(ladoA) || isNaN(ladoB) || isNaN(ladoC) || ladoA <= 0 || ladoB <= 0 || ladoC <= 0) {
        alert("Por favor, insira valores válidos e positivos para os lados do triângulo.");
        return;
    }

    let tipoTriangulo;
    if (ladoA === ladoB && ladoB === ladoC) {
        tipoTriangulo = "Equilátero";
    } else if (ladoA === ladoB || ladoB === ladoC || ladoC === ladoA) {
        tipoTriangulo = "Isósceles";
    } else {
        tipoTriangulo = "Escaleno";
    }

    document.getElementById("resultado").innerText = `Este triângulo é ${tipoTriangulo}.`;
}