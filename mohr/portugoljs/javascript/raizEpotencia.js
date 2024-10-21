function conta(){
    let valor0 = document.getElementById('valor0').value;
    let raiz = Math.sqrt(valor0);
    let pot = valor0 * valor0;
    document.getElementById('res').innerText = `A raiz quadrada de ${valor0} é ${raiz} "\n" E seu valor elevado a 2 é ${pot}`
}
