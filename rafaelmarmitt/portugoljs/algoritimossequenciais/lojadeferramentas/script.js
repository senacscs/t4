function calcularTotal() {
    // Preços unitários
    const PRECO_PARAFUSO = 1.50;
    const PRECO_ARRUELA = 2.00;
    const PRECO_PORCA = 2.50;
   
    // Obtendo os valores dos campos
    const nome = document.getElementById("nome").value;
    const quantidadeParafusos = parseInt(document.getElementById("parafusos").value);
    const quantidadeArruelas = parseInt(document.getElementById("arruelas").value);
    const quantidadePorcas = parseInt(document.getElementById("porcas").value);
   
    // Calculando os valores totais
    const totalParafusos = PRECO_PARAFUSO * quantidadeParafusos;
    const totalArruelas = PRECO_ARRUELA * quantidadeArruelas;
    const totalPorcas = PRECO_PORCA * quantidadePorcas;
    const totalPagar = totalParafusos + totalArruelas + totalPorcas;
   
    // Exibindo o resultado
    document.getElementById("resultado").innerHTML = `
      <h2>Resumo da Compra</h2>
      <p>Cliente: ${nome}</p>
      <p>Parafusos: ${quantidadeParafusos} - R$ ${totalParafusos.toFixed(2)}</p>
      <p>Arruelas: ${quantidadeArruelas} - R$ ${totalArruelas.toFixed(2)}</p>
      <p>Porcas: ${quantidadePorcas} - R$ ${totalPorcas.toFixed(2)}</p>
      <p><b>Total a pagar: R$ ${totalPagar.toFixed(2)}</b></p>
    `;
  }