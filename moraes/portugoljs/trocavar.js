function trocarValores() {
    // Obtém os valores inseridos pelo usuário
    let a = parseInt(document.getElementById("valorA").value);
    let b = parseInt(document.getElementById("valorB").value);
    
    // Exibe os valores antes da troca
    document.getElementById("antesDaTroca").textContent = `Valores antes da troca: A = ${a}, B = ${b}`;
    
    // Realiza a troca de valores usando uma variável auxiliar
    let aux = a;
    a = b;
    b = aux;
    
    // Exibe os valores após a troca
    document.getElementById("aposTroca").textContent = `Valores após a troca: A = ${a}, B = ${b}`;
}
