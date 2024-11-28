function verificarNumeroInteiro() {
    const numero = parseInt(document.getElementById('numeroInteiro').value);
    const mensagem = numero > 0
        ? `O número é positivo.`
        : numero < 0
        ? `O número é negativo.`
        : `O número é igual a zero.`;
    document.getElementById('resultadoMsg').innerText = mensagem;
}
 