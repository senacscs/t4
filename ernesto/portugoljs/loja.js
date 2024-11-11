function Calcular() {
    const PRECO_PARAFUSO = 1.50;
    const PRECO_ARRUELA = 2.00;
    const PRECO_PORCA = 2.50;
    const nome = document.getElementById("Nome").value;
    const quantidadeParafusos = parseInt(document.getElementById("Parafusos").value);
    const quantidadeArruelas = parseInt(document.getElementById("Arruelas").value);
    const quantidadePorcas = parseInt(document.getElementById("Porcas").value);
    const totalParafusos = PRECO_PARAFUSO * quantidadeParafusos;
    const totalArruelas = PRECO_ARRUELA * quantidadeArruelas;
    const totalPorcas = PRECO_PORCA * quantidadePorcas;
    const totalPagar = totalParafusos + totalArruelas + totalPorcas;
    document.getElementById("Resultado").innerHTML = `
      <h2>Resultado da Compra</h2>
      <p>Cliente: ${nome}</p>
      <p>Parafusos: ${quantidadeParafusos} - R$ ${totalParafusos.toFixed(2)}</p>
      <p>Arruelas: ${quantidadeArruelas} - R$ ${totalArruelas.toFixed(2)}</p>
      <p>Porcas: ${quantidadePorcas} - R$ ${totalPorcas.toFixed(2)}</p>
      <p><b>Total a pagar: R$ ${totalPagar.toFixed(2)}</b></p>
    `; 
  }