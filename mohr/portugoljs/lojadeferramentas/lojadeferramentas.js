document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("calcularBtn").addEventListener("click", calcularTotal);
});

function calcularTotal() {
    // Definindo os preços constantes dos produtos
    const PRECO_PAES = 0.50;
    const PRECO_PAODEQUEIJO = 4.00;
    const PRECO_COXINHA = 3.00;

    // Obtendo os valores das entradas
    let nome = document.getElementById("nome").value;
    let quantidadePaes = parseInt(document.getElementById("quantidadePaes").value) || 0;
    let quantidadePaodequeijo = parseInt(document.getElementById("quantidadePaodequeijo").value) || 0;
    let quantidadeCoxinha = parseInt(document.getElementById("quantidadeCoxinha").value) || 0;

    // Verifica se o nome foi preenchido
    if (!nome) {
        document.getElementById("resultado").innerHTML = "Por favor, insira seu nome.";
        return;
    }

    // Cálculo do total a pagar
    let totalPaes = PRECO_PAES * quantidadePaes;
    let totalPaodequeijo = PRECO_PAODEQUEIJO * quantidadePaodequeijo;
    let totalCoxinha = PRECO_COXINHA * quantidadeCoxinha;
    let totalPagar = totalPaes + totalPaodequeijo + totalCoxinha;

    // Exibindo o resultado na página
    let resultado = `<h3>Cliente: ${nome}</h3>`;
    resultado += "<hr>";
    resultado += `<p>Pães: ${quantidadePaes} x R$ ${PRECO_PAES.toFixed(2)} = R$ ${totalPaes.toFixed(2)}</p>`;
    resultado += `<p>Pão de queijo: ${quantidadePaodequeijo} x R$ ${PRECO_PAODEQUEIJO.toFixed(2)} = R$ ${totalPaodequeijo.toFixed(2)}</p>`;
    resultado += `<p>Coxinha: ${quantidadeCoxinha} x R$ ${PRECO_COXINHA.toFixed(2)} = R$ ${totalCoxinha.toFixed(2)}</p>`;
    resultado += "<hr>";
    resultado += `<h4>Total a pagar: R$ ${totalPagar.toFixed(2)}</h4>`;

    // Exibindo o resultado na página
    document.getElementById("resultado").innerHTML = resultado;
}
