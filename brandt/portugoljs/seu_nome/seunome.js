function saudar() {
    const nome = document.getElementById("nome").value;
    const saudacao = nome ? `Olá, ${nome}! (˶ᵔ ᵕ ᵔ˶)` : "Por favor, insira seu nome.";
    document.getElementById("result").innerHTML = saudacao;
}