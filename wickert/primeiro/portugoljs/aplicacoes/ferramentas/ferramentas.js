function finalizar() {
    let exibir = document.getElementById('resultpre');
    let quant1 = parseFloat(document.getElementById('f1').value)
    let quant2 = parseFloat(document.getElementById('f2').value)
    let quant3 = parseFloat(document.getElementById('f3').value)
    let quant4 = parseFloat(document.getElementById('f4').value)
    if (typeof quant1 !== 'number' || isNaN(quant1)) { quant1 = 0; }
    if (typeof quant2 !== 'number' || isNaN(quant2)) { quant2 = 0; }
    if (typeof quant3 !== 'number' || isNaN(quant3)) { quant3 = 0; }
    if (typeof quant4 !== 'number' || isNaN(quant4)) { quant4 = 0; }    
    let resultado = ((quant1 * 30) + (quant2 * 20) + (quant3 * 35) + (quant4 * 10)) / 100;
    exibir.innerText = `Pedido
    =================
    Parafusos: ${quant1}
    Arroelas: ${quant2}
    Porcas: ${quant3}
    Buchas: ${quant4}
    =================
    Total: R$ ${resultado}`
}