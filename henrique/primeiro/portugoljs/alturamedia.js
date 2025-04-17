document.getElementById("mediaBtn").addEventListener("click", function mediaNumeros() {
    const altura1 = parseFloat(document.getElementById("altura1").value);
    const altura2 = parseFloat(document.getElementById("altura2").value);
    const altura3 = parseFloat(document.getElementById("altura3").value);

    if (isNaN(altura1) || isNaN(altura2) || isNaN(altura3)) {
        document.getElementById("resultadoMsg").textContent = "Por favor, insira valores válidos para todas as alturas.";
        return;
    }

    const mediaAltura = ((altura1 + altura2 + altura3) / 3).toFixed(2);
    document.getElementById("resultadoMsg").textContent = `A média das alturas é ${mediaAltura}.`;
});
