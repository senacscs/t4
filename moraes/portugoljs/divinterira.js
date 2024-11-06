function calcular() {
    // Obtém o valor digitado pelo usuário
    const valor = parseInt(document.getElementById("inputValor").value);
    
    // Calcula a metade inteira do valor
    const metadeInteira = Math.floor(valor / 2);
    
    // Calcula o resto da divisão por 3
    const resto = valor % 3;

    // Exibe os resultados na página
    document.getElementById("resultadoMetade").textContent = "A metade inteira do número é: " + metadeInteira;
    document.getElementById("resultadoResto").textContent = "O resto (mod) da divisão por 3 é: " + resto;
}
