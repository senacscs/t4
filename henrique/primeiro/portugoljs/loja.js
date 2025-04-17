document.getElementById("calcularBtn").addEventListener("click", function calcularNumeros() {
    const nome = document.getElementById("cliente").value;
    const porcas = parseInt(document.getElementById("porcas").value);
    const parafusos = parseInt(document.getElementById("parafusos").value);
    const arruelas = parseInt(document.getElementById("arruelas").value);

    const PRECO_PORCA = 2.50;
    const PRECO_PARAFUSO = 1.50;
    const PRECO_ARRUELA = 2.00;

    if (!nome || isNaN(porcas) || isNaN(parafusos) || isNaN(arruelas)) {
        document.getElementById("resultadoMsg").textContent = "Por favor, preencha todos os campos corretamente.";
        return;
    }

    const totalPorcas = porcas * PRECO_PORCA;
    const totalParafusos = parafusos * PRECO_PARAFUSO;
    const totalArruelas = arruelas * PRECO_ARRUELA;
    const total = totalPorcas + totalParafusos + totalArruelas;

    document.getElementById("resultadoMsg").innerHTML = `
        <strong>Resumo da Compra:</strong><br>
        Cliente: ${nome}<br>
        Porcas: ${porcas} - R$ ${totalPorcas.toFixed(2)}<br>
        Parafusos: ${parafusos} - R$ ${totalParafusos.toFixed(2)}<br>
        Arruelas: ${arruelas} - R$ ${totalArruelas.toFixed(2)}<br>
        <strong>Total a pagar: R$ ${total.toFixed(2)}</strong>
    `;
});
