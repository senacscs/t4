function calcularTotal() {
    const PRECO_PARAFUSO = 1.0;
    const PRECO_ARRUELA = 1.50;
    const PRECO_PORCA = 0.50;
    const nome = document.getElementById("nome").value;
    const quantidadeParafusos = parseInt(document.getElementById("parafusos").value);
    const quantidadeArruelas = parseInt(document.getElementById("arruelas").value);
    const quantidadePorcas = parseInt(document.getElementById("porcas").value);
    const totalParafusos = PRECO_PARAFUSO * quantidadeParafusos;
    const totalArruelas = PRECO_ARRUELA * quantidadeArruelas;
    const totalPorcas = PRECO_PORCA * quantidadePorcas;
    const totalPagar = totalParafusos + totalArruelas + totalPorcas;
    document.getElementById("resultado").innerHTML = `
      <h2>Resumo da Compra</h2>
      <p>Cliente: ${nome}</p>
      <p>Parafusos: ${quantidadeParafusos} - R$ ${totalParafusos.toFixed(2)}</p>
      <p>Arruelas: ${quantidadeArruelas} - R$ ${totalArruelas.toFixed(2)}</p>
      <p>Porcas: ${quantidadePorcas} - R$ ${totalPorcas.toFixed(2)}</p>
      <p><b>Total a pagar: R$ ${totalPagar.toFixed(2)}</b></p>
    `; 
  }