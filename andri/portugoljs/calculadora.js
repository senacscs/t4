document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("calcularBtn").addEventListener("click", calcularTotal);
});

function calcularTotal() {
    const PRECO_Caneta = 0.75;
    const PRECO_caderno = 5.00;
    const PRECO_lápis= 1.00;

    let nome = document.getElementById("nome").value;
    let quantidadePaes = parseInt(document.getElementById("quantidadeCaneta").value) || 0;
    let quantidadePaodequeijo = parseInt(document.getElementById("quantidadeCaderno").value) || 0;
    let quantidadeCoxinha = parseInt(document.getElementById("quantidadeLápis").value) || 0;

    
    if (!nome) {
        document.getElementById("resultado").innerHTML = "Por favor, insira seu nome.";
        return;
    }

    // Cálculo do total a pagar
    let totalPaes = PRECO_Caneta * quantidadeCaneta;
    let totalPaodequeijo = PRECO_CADERNO* quantidadeCaderno;
    let totalCoxinha = PRECO_LÁPIS * quantidadeLápis;
    let totalPagar = totalCaneta + totalCaderno + totalLápis;

  
    let resultado = `<h3>Cliente: ${nome}</h3>`;
    resultado += "<hr>";
    resultado += `<p>caneta: ${quantidedeCaneta} x R$ ${PRECO_Caneta.toFixed(2)} = R$ ${totalCaneta.toFixed(2)}</p>`;
    resultado += `<p>caderno: ${quantidadeCaderno} x R$ ${PRECO_caderno.toFixed(2)} = R$ ${totalCaderno.toFixed(2)}</p>`;
    resultado += `<p>lápis: ${quantidadeLápis} x R$ ${PRECO_lápis.toFixed(2)} = R$ ${totalLápis.toFixed(2)}</p>`;
    resultado += "<hr>";
    resultado += `<h4>Total a pagar: R$ ${totalPagar.toFixed(2)}</h4>`;


    document.getElementById("resultado").innerHTML = resultado;
}