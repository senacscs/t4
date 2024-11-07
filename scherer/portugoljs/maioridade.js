function verificarMaioridade() {
    const MAIORIDADE = 18;
    let idade = parseInt(document.getElementById('idade').value);
    let anos = MAIORIDADE - idade;
    let resultado;
    if (anos > 0) {
        resultado = "Falta(m) " + anos + " ano(s) para você atingir a maioridade";
    } else {
        resultado = "Você já atingiu a maioridade";
    }
    document.getElementById('resultado').innerText = resultado;
}