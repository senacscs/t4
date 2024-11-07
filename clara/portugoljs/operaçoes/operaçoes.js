

function multi(){
    const fator1 = document.getElementById('valor1').value;
    const fator2 = document.getElementById('valor2').value;
    const resultado = fator1 * fator2;
    document.getElementById('res').innerText = `O valor de ${fator1} multiplicado por ${fator2} é = ${resultado}`
  }
  function dividir(){
    const fator1 = document.getElementById('valor1').value;
    const fator2 = document.getElementById('valor2').value;
    const resultado = fator1 / fator2;
    document.getElementById('res').innerText = `O valor de ${fator1} dividido por ${fator2} é = ${resultado}`
    
  }
  function subtrair(){
    const fator1 = document.getElementById('valor1').value;
    const fator2 = document.getElementById('valor2').value;
    const resultado = fator1 - fator2;
    document.getElementById('res').innerText = `O valor de ${fator1} menos ${fator2} é = ${resultado}`
  }
  function somar(){
    let fator1 = parseInt(document.getElementById('valor1').value);
    let fator2 = parseInt(document.getElementById('valor2').value);
    let resultado = fator1 + fator2;
    document.getElementById('res').innerText = `O valor de ${fator1} mais ${fator2} é = ${resultado}`
  }