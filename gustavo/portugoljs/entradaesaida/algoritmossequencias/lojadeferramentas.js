function inicio() {
    // Preços dos produtos
    const PRECO_PARAFUSO = 1.50;
    const PRECO_ARRUELA = 2.00;
    const PRECO_PORCA = 2.50;

    // Obtém os valores do input
    const nome = document.getElementById("nome").value;
    const quantidadeParafusos = parseInt(document.getElementById("quantidadeParafusos").value) || 0;
    const quantidadeArruelas = parseInt(document.getElementById("quantidadeArruelas").value) || 0;
    const quantidadePorcas = parseInt(document.getElementById("quantidadePorcas").value) || 0;

    // Cálculo dos totais
    const totalParafusos = PRECO_PARAFUSO * quantidadeParafusos;
    const totalArruelas = PRECO_ARRUELA * quantidadeArruelas;
    const totalPorcas = PRECO_PORCA * quantidadePorcas;
    const totalPagar = totalParafusos + totalArruelas + totalPorcas;

    // Exibe os resultados
    const resultado = `
Cliente: ${nome}
===============================
Parafusos: ${quantidadeParafusos}
Arruelas: ${quantidadeArruelas}
Porcas: ${quantidadePorcas}
===============================
Total a pagar: R$ ${totalPagar.toFixed(2)}
    `;
    
    document.getElementById("resultado").innerText = resultado;
}
