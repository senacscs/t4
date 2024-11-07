function calcular() {
    // Recupera o valor digitado no input
    const valor = parseInt(document.getElementById('numeroInput').value);
    
    // Calcula a metade inteira (divisão inteira por 2)
    const metadeInteira = Math.floor(valor / 2);
    
    // Calcula o resto da divisão por 3 (mod)
    const resto = valor % 3;
    
    // Exibe o resultado
    document.getElementById('resultadoMsg').innerText = `A metade inteira do número ${valor} é: ${metadeInteira}\nO resto (mod) da divisão por 3 é: ${resto}`;
}