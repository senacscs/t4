function calcularTotal() {
    const CAMISA_SOCIAL = 75.0;
    const SAIA_PRETA = 20.0;
    const BOTA_DE_COURO = 85.5;

    const nome = document.getElementById("nome").value;
    const quantidadeCamisa = parseInt(document.getElementById("quantidadeCamisa").value) || 0;
    const quantidadeSaia = parseInt(document.getElementById("quantidadeSaia").value) || 0;
    const quantidadeBota = parseInt(document.getElementById("quantidadeBota").value) || 0;

    const totalCamisa = CAMISA_SOCIAL * quantidadeCamisa;
    const totalSaia = SAIA_PRETA * quantidadeSaia;
    const totalBota = BOTA_DE_COURO * quantidadeBota;
    const totalPagar = totalCamisa + totalSaia + totalBota;

    let resultado = `<p>Cliente: ${nome || "Não informado"}</p>`;
    resultado += `<div class="divider"></div>`;
    resultado += `<p>Camisas Sociais: ${quantidadeCamisa}</p>`;
    resultado += `<p>Saias Pretas: ${quantidadeSaia}</p>`;
    resultado += `<p>Botas de Couro: ${quantidadeBota}</p>`;
    resultado += `<div class="divider"></div>`;
    resultado += `<p><strong>Total a pagar: R$ ${totalPagar.toFixed(2)}</strong></p>`;

    document.getElementById("result").innerHTML = resultado;
}