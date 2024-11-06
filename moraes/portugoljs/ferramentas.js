function calcularTotalCompra() {
    const PRECO_PARAFUSO = 1.50;
    const PRECO_ARRUELA = 2.00;
    const PRECO_PORCA = 2.50;

    let nome = document.getElementById("nome").value;
    let quantidadeParafusos = parseInt(document.getElementById("quantidadeParafusos").value);
    let quantidadeArruelas = parseInt(document.getElementById("quantidadeArruelas").value);
    let quantidadePorcas = parseInt(document.getElementById("quantidadePorcas").value);

    // Calcula o valor total de cada item
    let totalParafusos = PRECO_PARAFUSO * quantidadeParafusos;
    let totalArruelas = PRECO_ARRUELA * quantidadeArruelas;
    let totalPorcas = PRECO_PORCA * quantidadePorcas;

    // Calcula o valor total a pagar
    let totalPagar = totalParafusos + totalArruelas + totalPorcas;

    // Exibe o resultado
    document.getElementById("resultado").innerHTML = `
        <p>Cliente: ${nome}</p>
        <p>===============================</p>
        <p>Parafusos: ${quantidadeParafusos}</p>
        <p>Arruelas: ${quantidadeArruelas}</p>
        <p>Porcas: ${quantidadePorcas}</p>
        <p>===============================</p>
        <p>Total a pagar: R$ ${totalPagar.toFixed(2)}</p>
    `;
}
