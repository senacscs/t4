const resultpora = document.getElementById('prresult');
function po() {
    let a = parseFloat(document.getElementById('numeroa').value);
    let b = parseFloat(document.getElementById('numerob').value);
    let resultado = a ** b;
    resultpora.innerText = `${a} elevado a ${b} = ${resultado}`;
}
function ra() {
    let a = parseFloat(document.getElementById('numeroa').value);
    let b = parseFloat(document.getElementById('numerob').value);
    let resultado = a ** (1 / b);
    resultpora.innerText = `A raiz ${b} de ${a} = ${resultado}`;
}