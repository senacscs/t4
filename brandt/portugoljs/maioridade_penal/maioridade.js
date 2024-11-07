function verificarCompra() {
    const INGRESSO = 795;
    const quantia = parseInt(document.getElementById("quantia").value);
    let resultado = '';

    if (!isNaN(quantia)) {
        const dinheiro = INGRESSO - quantia;

        if (dinheiro > 0) {
            resultado = `Falta(m) ${dinheiro} reais para você comprar um ingresso.`;
        } else {
            resultado = "Você já pode comprar um ingresso!";
        }
    } else {
        resultado = "Por favor, insira um valor válido.";
    }

    document.getElementById("result").innerHTML = resultado;
}