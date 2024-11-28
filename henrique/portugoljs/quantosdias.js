document.querySelector("button[onclick='diasNumeros()']").addEventListener("click", function diasNumeros() {
    const ano = parseInt(document.getElementById("anoInput").value);

    if (isNaN(ano) || ano < 1) {
        document.getElementById("resultadoMsg").textContent = "Por favor, insira um ano válido.";
        return;
    }

    const dias = (ano - 1) * 365 + Math.floor((ano - 1) / 4);
    document.getElementById("resultadoMsg").textContent = `Já se passaram aproximadamente ${dias} dias desde 01/01/0001.`;
});