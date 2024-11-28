function verificarAlturaMedia() {
    // Obter os valores das alturas
    var altura1 = document.getElementById("altura1").value;
    var altura2 = document.getElementById("altura2").value;
    var altura3 = document.getElementById("altura3").value;

    // Verificar se todos os valores são válidos (formato correto)
    if (!altura1.match(/^\d+,\d+$/) || !altura2.match(/^\d+,\d+$/) || !altura3.match(/^\d+,\d+$/)) {
        alert("Por favor, insira valores válidos para todas as alturas (ex: 1,70).");
        return;
    }

    // Converter os valores para número
    altura1 = parseFloat(altura1.replace(",", "."));
    altura2 = parseFloat(altura2.replace(",", "."));
    altura3 = parseFloat(altura3.replace(",", "."));

    // Calcular a altura média
    var mediaAltura = (altura1 + altura2 + altura3) / 3;

    // Exibir o resultado com base na altura média
    document.getElementById("resultado").innerHTML = "A altura média é: " + mediaAltura.toFixed(2);
}