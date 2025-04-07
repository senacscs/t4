document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("button[onclick='calcular()']").addEventListener("click", calcularDivisaoInteira);
});

function calcularDivisaoInteira() {
    let metadeInteira, resto, valor;

    valor = parseInt(document.getElementById("numeroInput").value);

    if (isNaN(valor)) {
        document.getElementById("resultadoMsg").innerHTML = "Por favor, insira um valor válido.";
        return;
    }

    metadeInteira = Math.floor(valor / 2); 
    resto = valor % 3; 

    document.getElementById("resultadoMsg").innerHTML = 
        `A metade inteira do número é: ${metadeInteira}<br>O resto (mod) da divisão por 3 é: ${resto}`;
}