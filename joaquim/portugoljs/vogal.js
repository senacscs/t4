function verificarLetra() {
    const letra = document.getElementById("letraInput").value;

    if (letra.length !== 1) {
        alert("Por favor, insira apenas uma letra.");
        return;
    }

    const vogais = ['A', 'E', 'I', 'O', 'U', 'a', 'e', 'i', 'o', 'u'];

    if (vogais.includes(letra)) {
        document.getElementById("resultado").innerText = `A letra '${letra}' é uma vogal.`;
    } else {
        document.getElementById("resultado").innerText = `A letra '${letra}' é uma consoante.`;
    }
}