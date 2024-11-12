
const PRECO_PARAFUSO = 1.50;
const PRECO_ARRUELA = 2.00;
const PRECO_PORCA = 2.50;

function calcularTotal() {
  
  const nome = document.getElementById("nome").value;
  const quantidadeParafusos = parseInt(document.getElementById("quantidadeParafusos").value) || 0;
  const quantidadeArruelas = parseInt(document.getElementById("quantidadeArruelas").value) || 0;
  const quantidadePorcas = parseInt(document.getElementById("quantidadePorcas").value) || 0;

  
  const totalParafusos = PRECO_PARAFUSO * quantidadeParafusos;
  const totalArruelas = PRECO_ARRUELA * quantidadeArruelas;
  const totalPorcas = PRECO_PORCA * quantidadePorcas;

 
  const totalPagar = totalParafusos + totalArruelas + totalPorcas;


  document.getElementById("resultado").innerHTML = `
    <p><strong>Cliente:</strong> ${nome}</p>
    <p>===============================</p>
    <p><strong>Parafusos:</strong> ${quantidadeParafusos}</p>
    <p><strong>Arruelas:</strong> ${quantidadeArruelas}</p>
    <p><strong>Porcas:</strong> ${quantidadePorcas}</p>
    <p>===============================</p>
    <p><strong>Total a pagar:</strong> R$ ${totalPagar.toFixed(2)}</p>
  `;
}