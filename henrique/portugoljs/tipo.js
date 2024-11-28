function verificarTipoTriangulo() {
    const ladoA = parseInt(document.getElementById('ladoA').value);
    const ladoB = parseInt(document.getElementById('ladoB').value);
    const ladoC = parseInt(document.getElementById('ladoC').value);
    let mensagem = '';
    if (ladoA === ladoB && ladoB === ladoC) {
        mensagem = `Este triângulo é Equilátero.`;
    } else if (ladoA === ladoB || ladoB === ladoC || ladoC === ladoA) {
        mensagem = `Este triângulo é Isósceles.`;
    } else {
        mensagem = `Este triângulo é Escaleno.`;
    }
    document.getElementById('resultadoMsg').innerText = mensagem;
}