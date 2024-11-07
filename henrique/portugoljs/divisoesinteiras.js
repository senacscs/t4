function calcular() {
    const valor = parseInt(document.getElementById('numeroInput').value);
    
    const metadeInteira = Math.floor(valor / 2);
    
    const resto = valor % 3;
    
    document.getElementById('resultadoMsg').innerText = `A metade inteira do número ${valor} é: ${metadeInteira}\nO resto (mod) da divisão por 3 é: ${resto}`;
}